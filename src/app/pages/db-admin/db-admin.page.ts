import { Component, OnInit } from '@angular/core';

import {
  NilmActions,
  DbAdminActions } from '../../actions';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { TreeNode } from 'angular2-tree-component';

@Component({
  selector: 'app-db-admin',
  templateUrl: './db-admin.page.html',
  styleUrls: ['./db-admin.page.css']
})
export class DbAdminPageComponent implements OnInit {
  @select(['nilm']) nilms$: Observable<any>;
  @select(['dbAdmin', 'nilmId']) nilm_id$: Observable<number>;
  @select(['dbAdmin', 'selected_type']) selectedType$: Observable<string>;
  @select(['dbAdmin', 'selected_id']) selectedId$: Observable<number>;
  public nodes$: Observable<{}>;
  //public selectedType$ = 'dbfolder';
  //private _nilm: BehaviorSubject<INilm>
  public treeOptions = {};
  constructor(
    private nilmActions: NilmActions,
    private dbAdminActions: DbAdminActions
  ) {

    this.nodes$ =
      Observable.combineLatest(
        this.nilms$,
        this.nilm_id$,
      )
        .filter(([nilms, nilm_id]) =>
          'nilms' in nilms)
        .filter(([nilms, nilm_id]) =>
          nilm_id in nilms.nilms)
        .map(([nilms, nilm_id]) => {
          let db = nilms.dbs[nilms.nilms[nilm_id].db]
          let root = this._mapFolder(nilms, db.contents)
          return root.children;
        });
    this.treeOptions = {
      getChildren: this.getChildren.bind(this)
    }
  }


  public getChildren(node: TreeNode) {
    console.log(node);
    this.nilmActions.loadFolder(node.data.id);

  }
  public selectNode(event) {
    let node: TreeNode = event.node
    this.dbAdminActions.selectItem(node)
  }
  private _mapFolder(nilms, db_folder_id) {
    let dbFolder = nilms.dbFolders[db_folder_id];
    let children = null;
    //console.log(dbFolder);
    if ("subfolders" in dbFolder) {
      children = dbFolder.subfolders
        .map(subfolder_id => this._mapFolder(nilms, subfolder_id))
    }
    return {
      id: dbFolder.id,
      name: dbFolder.name,
      type: 'dbfolder',
      children: children,
      hasChildren: true,
    };
  }

  private _mapStream(nilms, db_stream_id) {
    let dbStream = nilms.db_streams[db_stream_id]
    return {
      id: dbStream.id,
      name: dbStream.name,
      type: 'dbstream',
      children: []
    };
  }

  ngOnInit() {
    this.dbAdminActions.setNilmId(71);
    this.nilmActions.loadNilms();
  }

}
