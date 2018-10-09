import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from 'angular-tree-component';
import { Observable, Subscription } from 'rxjs';
import { select } from '@angular-redux/store';

import {
  DbFolderService,
} from '../../../services';
import { InstallationService } from '../../installation.service';
import { InstallationSelectors } from '../../installation.selectors';
import {
  INilm,
  IDbFolder,
  IDbFolderRecords,
  IJouleModuleRecords,
  IDbStreamRecords,
  IDbStream
} from '../../../store/data';
import { combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { data } from '../../../api';

@Component({
  selector: 'installation-database-tab',
  templateUrl: './database.tab.html',
  styleUrls: ['./database.tab.css']
})
export class DatabaseTabComponent {

  //@Input() nilm: INilm;

  private subs: Subscription[];
  //public myNilm: INilm;
  public nilmTree$: Observable<DbTreeNode[]>

  constructor(
    public installationService: InstallationService,
    private dbFolderService: DbFolderService,
    public installationSelectors: InstallationSelectors,
  ) {
    this.subs = [];
    this.nilmTree$ = combineLatest(
      this.installationSelectors.nilm$,
      this.installationSelectors.data$).pipe(
        map(([nilm, data]) => this.mapNilm(nilm, 
          data.jouleModules,
          data.dbFolders, data.dbStreams)));
    
  };

  public toggleNode(event: any){
    if(event.isExpanded == false)
      return; //nothing to do
    let node = event.node;
    if(node.hasChildren && node.children == null){
      this.dbFolderService.loadFolder(node.data.dbId);
    }
  }

  public selectNode(event) {
    let node: TreeNode = event.node;
    switch (node.data.type) {
      case 'dbFolder':
        this.installationService.selectDbFolder(node.data.dbId);
        return;
      case 'dbStream':
        this.installationService.selectDbStream(node.data.dbId);
        return;
      case 'jouleModule':
        this.installationService.selectJouleModule(node.data.dbId);
        return;
      default:
        console.log(`unknown type ${node.data.type}`);
    }
  }

  /*ngOnInit() {
    this.installationService.setRootFolderId(this.nilm.root_folder)
    this.installationService.selectDbRoot();
  }*/

  mapNilm(
    nilm: INilm,
    jouleModules: IJouleModuleRecords,
    folders: IDbFolderRecords,
    streams: IDbStreamRecords,
  ): DbTreeNode[] {

    
    //first map folders
    let root = folders[nilm.root_folder]
    let folder_nodes = root.subfolders
      .filter(id => folders[id] !== undefined)
      .map(id => this.mapFolder(
        folders[id], folders, streams))
    let module_nodes = this.mapJouleModules(nilm.jouleModules, jouleModules)
    return module_nodes.concat(folder_nodes);
/*
    return {
        id: 'n' + nilm.id,
        type: 'nilm',
        refreshing: false,
        nilmId: nilm.id,
        name: nilm.name,
        children: folder_nodes.concat(module_nodes),
        hasChildren: true
      }*/
    }
  

  mapJouleModules(
    moduleIds: Array<number>,
    jouleModules: IJouleModuleRecords
  ): DbTreeNode[]{
    return moduleIds.map(id => jouleModules[id])
    .filter(module => module !== undefined)
    .filter(module => module.web_interface)
    .map(module => {
      return {
      id: 'j'+module.id,
      dbId: module.id,
      type: 'jouleModule',
      name: module.name,
      children: [],
      hasChildren: false
      }
    })
  }

  mapFolder(
    folder: IDbFolder,
    folders: IDbFolderRecords,
    streams: IDbStreamRecords,
  ): DbTreeNode {
    let children = null;
    //if folder is loaded, map children
    if (!folder.shallow) {
      children = [].concat(
        //first map subfolders
        folder.subfolders
          .filter(id => folders[id] !== undefined)
          .map(id => this.mapFolder(
            folders[id], folders, streams)),
        //now map streams
        folder.streams
          .filter(id => streams[id] !== undefined)
          .map(id => this.mapStream(
            streams[id])))
    }
    //create the DbNode and return it
    return {
      id: 'f' + folder.id,
      dbId: folder.id,
      name: folder.name,
      type: 'dbFolder',
      children: children,
      hasChildren: true
    }
  }

  mapStream(
    stream: IDbStream,
  ): DbTreeNode {
    return {
      id: 's' + stream.id,
      dbId: stream.id,
      name: stream.name,
      type: 'dbStream',
      children: [],
      hasChildren: false
    }
  }

  ngOnDestroy() {
    for (var sub of this.subs) {
      sub.unsubscribe();
    }
  }
}

export interface DbTreeNode {
  id: string;
  dbId: number;
  name: string;
  type: string;
  refreshing?: boolean;
  isExpanded?: boolean;
  children: DbTreeNode[];
  hasChildren: boolean;
  priveleged?: boolean;
  nilmId?: number;
};