import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { TreeNode } from 'angular-tree-component';

import {
  NilmService,
  DbService,
  DbFolderService
} from '../../../services';
import {
  INilm,
  IDb,
  IDbFolder,
  IDbStream,
  IDbElement,
  IJouleModuleRecords,
  IDbFolderRecords,
  IDbStreamRecords,
  IDbElementRecords
} from '../../../store/data';
import * as _ from 'lodash';
import { PlotService } from '../../services/plot.service';
import { PlotSelectors } from '../../selectors/plot.selectors';

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.css']
})

export class FileTreeComponent implements OnInit {
  public dbNodes$: Observable<DbTreeNode[]>;

  constructor(
    public nilmService: NilmService,
    private dbService: DbService,
    private dbFolderService: DbFolderService,
    private plotService: PlotService,
    public plotSelectors: PlotSelectors
  ) {
  }

  ngOnInit() {
    this.nilmService.loadNilms()
      .subscribe(() => { },
      () => { },
      () => this.plotService.setNilmsLoaded());

    this.dbNodes$ = this.plotSelectors.data$
      .combineLatest(this.plotSelectors.plottedElements$)
      .map(([data,elements]) => {
        let nilms = _.toArray(data.nilms);
        return nilms.map(nilm => {
          let priveleged = false;
          return this.mapNilm(nilm, data.dbs[nilm.db],
            data.jouleModules,
            data.dbFolders, data.dbStreams, data.dbElements);
        })
      })
  }

  public toggleNode(event: any){
    if(event.isExpanded == false)
      return; //nothing to do
    let node = event.node;
    if(node.hasChildren && node.children == null){
      this.getChildren(node);
    }
  }
  public getChildren(node: TreeNode) {
    let id = node.data.id.slice(1, node.data.id.len);
    switch (node.data.type) {
      case 'nilm':
        this.nilmService.loadNilm(id);
        return [];
      case 'dbFolder':
        this.dbFolderService.loadFolder(id);
        return [];
    }
  }

  mapNilm(
    nilm: INilm,
    db: IDb,
    jouleModules: IJouleModuleRecords,
    folders: IDbFolderRecords,
    streams: IDbStreamRecords,
    elements: IDbElementRecords,
  ): DbTreeNode {
    let children = null
    if (db != null && folders[db.contents] !== undefined) {
      //nilm is loaded, map it out
      let root = this.mapFolder(folders[db.contents],
        folders, streams, elements);
      //add the Joule Modules to the top of the folder listing
      root.children.unshift({
        id: 'mf' + nilm.id,
        type: 'jouleModulesFolder',
        name: 'Interfaces',
        hasChildren: true,
        children: this.mapJouleModules(nilm.jouleModules, jouleModules),
      });
      return Object.assign({}, root, {
        id: 'n' + nilm.id,
        type: 'nilm',
        refreshing: nilm.refreshing,
        nilmId: nilm.id,
        name: nilm.name
      });
    } else {
      //nilm is a stub, it has not been loaded
      return {
        id: 'n' + nilm.id,
        type: 'nilm',
        refreshing: nilm.refreshing,
        nilmId: nilm.id,
        name: nilm.name,
        children: null,
        hasChildren: true
      }
    }
  }

  mapJouleModules(
    moduleIds: Array<number>,
    jouleModules: IJouleModuleRecords
  ): DbTreeNode[]{
    return moduleIds.map(id =>{
      return {
      id: 'j'+id,
      type: 'jouleModule',
      name: jouleModules[id].name,
      children: [],
      hasChildren: false
      }
    })
  }

  mapFolder(
    folder: IDbFolder,
    folders: IDbFolderRecords,
    streams: IDbStreamRecords,
    elements: IDbElementRecords,
  ): DbTreeNode {
    let children = null;
    //if folder is loaded, map children
    if (!folder.shallow) {
      children = [].concat(
        //first map subfolders
        folder.subfolders
          .filter(id => folders[id] !== undefined)
          .map(id => this.mapFolder(
            folders[id], folders, streams, elements)),
        //now map streams
        folder.streams
          .filter(id => streams[id] !== undefined)
          .map(id => this.mapStream(
            streams[id], elements)))
    }
    //create the DbNode and return it
    return {
      id: 'f' + folder.id,
      name: folder.name,
      type: 'dbFolder',
      children: children,
      hasChildren: true
    }
  }

  mapStream(
    stream: IDbStream,
    elements: IDbElementRecords
  ): DbTreeNode {
    let children = stream.elements
      .map(id => elements[id])
      .filter(element => element !== undefined)
      .filter(element => element.plottable)
      .map(element => this.mapElement(element))
    //create the DbNode and return it
    return {
      id: 's' + stream.id,
      name: stream.name,
      type: 'dbStream',
      children: children,
      hasChildren: children != null
    }
  }

  mapElement(
    element: IDbElement,
  ): IDbElementNode {
    let plotted = this.plotService.isPlotted(element);
    let plottable = this.plotService.isPlottable(element.units);

    let tooltip = "";
    if (plottable == false) {
      tooltip = `no axis for [ ${element.units} ]`;
    }
    //create the DbNode and return it
    return {
      id: 'e' + element.id,
      name: element.name,
      type: 'dbElement',
      element: element,
      plotted: plotted,
      plottable: plottable,
      color: element.color,
      tooltip: tooltip,
      children: [],
      hasChildren: false
    }
  }
}


export interface DbTreeNode {
  id: string;
  name: string;
  type: string;
  refreshing?: boolean;
  isExpanded?: boolean;
  children: DbTreeNode[];
  hasChildren: boolean;
  priveleged?: boolean;
  nilmId?: number;
};
export interface IDbElementNode
  extends DbTreeNode {
  element: IDbElement;
  plotted: boolean;
  plottable: boolean;
  tooltip: string;
  color: string;
}