import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { TreeNode } from 'angular2-tree-component';

import {
  NilmService,
  DbService,
  DbFolderService
} from '../../../services';
import {
  IState,
  INilm,
  IDb,
  IDbFolder,
  IDbStream,
  IDbElement,
  IDbFolderRecords,
  IDbStreamRecords,
  IDbElementRecords
} from '../../../store/data';
import * as _ from 'lodash';
import { ExplorerService } from '../../explorer.service';
import { IExplorer } from '../../store';

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.css']
})

export class FileTreeComponent implements OnInit {
  @select(['data']) data$: Observable<IState>;
  @select(['ui', 'explorer']) uiState$: Observable<IExplorer>;

  public dbNodes$: Observable<DbTreeNode[]>;

  public treeOptions = {};


  constructor(
    private nilmService: NilmService,
    private dbService: DbService,
    private dbFolderService: DbFolderService,
    private explorerService: ExplorerService
  ) {
    this.treeOptions = {
      getChildren: this.getChildren.bind(this)
    };
  }

  ngOnInit() {
    this.nilmService.loadNilms();

    this.dbNodes$ = this.data$
      .combineLatest(this.uiState$)
      .map(([data, ui]) => {
        let nilms = _.toArray(data.nilms.entities);
        let privelegedNilms = [].concat(data.nilms.admin,data.nilms.owner);
        return nilms.map(nilm => {
          //check if user had owner/admin priveleges
          let priveleged = false;
          if(privelegedNilms.indexOf(nilm.id)!=-1){
            priveleged=true;
          }
          return this.mapNilm(nilm, priveleged, data.dbs[nilm.db_id],
          data.dbFolders, data.dbStreams, data.dbElements, ui);
        })
      });
  }

  public getChildren(node: TreeNode) {
    let id = node.data.id.slice(1, node.data.id.len);
    switch (node.data.type) {
      case 'nilm':
        this.dbService.loadDb(id);
        return;
      case 'dbFolder':
        this.dbFolderService.loadFolder(id);
        return;
    }
  }

  mapNilm(
    nilm: INilm,
    priveleged: boolean,
    db: IDb,
    folders: IDbFolderRecords,
    streams: IDbStreamRecords,
    elements: IDbElementRecords,
    ui: IExplorer,
  ): DbTreeNode {
    let children = null
    if (db != null && folders[db.contents] !== undefined) {

      //nilm is loaded, map it out
      let root = this.mapFolder(folders[db.contents],
        folders, streams, elements, ui);
      
      return Object.assign({}, root, {
        id: 'n' + nilm.db_id,
        type: 'nilm',
        priveleged: priveleged,
        nilmId: nilm.id,
        name: nilm.name
      });
    } else {
      //nilm is a stub, it has not been loaded
      return {
        id: 'n' + nilm.db_id,
        type: 'nilm',
        priveleged: priveleged,
        nilmId: nilm.id,
        name: nilm.name,
        children: null,
        hasChildren: true
      }
    }
  }

  mapFolder(
    folder: IDbFolder,
    folders: IDbFolderRecords,
    streams: IDbStreamRecords,
    elements: IDbElementRecords,
    ui: IExplorer
  ): DbTreeNode {
    let children = null;
    //if folder is loaded, map children
    if (!folder.shallow) {
      children = [].concat(
        //first map subfolders
        folder.subfolders
          .filter(id => folders[id] !== undefined)
          .map(id => this.mapFolder(
            folders[id], folders, streams, elements, ui)),
        //now map streams
        folder.streams
          .filter(id => streams[id] !== undefined)
          .map(id => this.mapStream(
            streams[id], elements, ui)))
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
    elements: IDbElementRecords,
    ui: IExplorer
  ): DbTreeNode {
    let children = stream.elements
      .filter(id => elements[id] !== undefined)
      .map(id => this.mapElement(elements[id], ui))
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
    ui: IExplorer
  ): IDbElementNode {
    let plotted = false;
    if (_.includes(ui.left_elements, element.id) ||
      _.includes(ui.right_elements, element.id)) {
      plotted = true;
    }
    let plottable = false;
    if (ui.left_units == element.units ||
      ui.right_units == element.units ||
      ui.left_elements.length == 0 ||
      ui.right_elements.length == 0) {
      plottable = true;
    }
    let tooltip="";
    if(plottable==false){
      tooltip=`no axis for [ ${element.units} ]`;
    }
    //create the DbNode and return it
    return {
      id: 'e' + element.id,
      name: element.name,
      type: 'dbElement',
      element: element,
      plotted: plotted,
      plottable: plottable,
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
}