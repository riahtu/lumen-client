import { Component, OnInit } from '@angular/core';

import {
  NilmService,
  DbAdminService } from '../../services';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { TreeNode } from 'angular2-tree-component';

@Component({
  selector: 'app-db-admin',
  templateUrl: './db-admin.page.html',
  styleUrls: ['./db-admin.page.css']
})
export class DbAdminPageComponent implements OnInit {
  @select(['data']) data$: Observable<any>;
  @select(['dbAdmin', 'dbId']) db_id$: Observable<number>;
  @select(['dbAdmin', 'selectedType']) selectedType$: Observable<string>;
  @select(['dbAdmin', 'selectedId']) selectedId$: Observable<number>;
  public nodes$: Observable<{}>;
  //public selectedType$ = 'dbfolder';
  //private _nilm: BehaviorSubject<INilm>
  public treeOptions = {};
  constructor(
    private nilmService: NilmService,
    private dbAdminService: DbAdminService
  ) {

    this.nodes$ =
      Observable.combineLatest(
        this.data$,
        this.db_id$,
      )
        .filter(([data, db_id]) =>
          db_id in data.dbs)
        .filter(([data, db_id]) =>
          data.dbs[db_id].contents in data.dbFolders)
        .map(([data, db_id]) => {
          let db = data.dbs[db_id]
          let root = this._mapFolder(data, db.contents)
          return root.children;
        });
    this.treeOptions = {
      getChildren: this.getChildren.bind(this)
    }
  }


  public getChildren(node: TreeNode) {
    console.log(node);
    this.nilmService.loadFolder(node.data.id);

  }
  public selectNode(event) {
    let node: TreeNode = event.node
    this.dbAdminService.selectItem(node)
  }
  private _mapFolder(data, db_folder_id) {


    let dbFolder = data.dbFolders[db_folder_id];
    let children = null;
    //console.log(dbFolder);
    if (!dbFolder.shallow) {
      children =
        dbFolder.subfolders
          .map(subfolder_id => this._mapFolder(data, subfolder_id))
          .concat(dbFolder.streams
            .filter(stream_id => stream_id in data.dbStreams)
            .map(stream_id => this._mapStream(data, stream_id)));
    }
    return {
      id: dbFolder.id,
      name: dbFolder.name,
      type: 'dbfolder',
      children: children,
      hasChildren: true,
    };
  }

  private _mapStream(data, db_stream_id) {
    let dbStream = data.dbStreams[db_stream_id]
    return {
      id: dbStream.id,
      name: dbStream.name,
      type: 'dbstream',
      children: []
    };
  }

  ngOnInit() {
    this.dbAdminService.setDbId(72);
    this.nilmService.loadNilms();
  }

}
