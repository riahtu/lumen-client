import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from 'angular2-tree-component';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';

import {
  NilmService,
  DbAdminService,
  DbFolderService,
  DbService,
  DbAdminSelectors,
} from '../../services';

import {
  INilmRecord,
  IDbRecords
} from '../../store';

@Component({
  selector: 'app-db-admin',
  templateUrl: './db-admin.page.html',
  styleUrls: ['./db-admin.page.css']
})
export class DbAdminPageComponent implements OnInit {

  @Input() nilm: Observable<INilmRecord>
  @select(['data', 'dbs']) dbs$: Observable<IDbRecords>;

  public treeOptions = {};

  constructor(
    private nilmService: NilmService,
    public dbService: DbService,
    private dbAdminService: DbAdminService,
    private dbFolderService: DbFolderService,
    public dbAdminSelectors: DbAdminSelectors,
  ) {
    this.treeOptions = {
      getChildren: this.getChildren.bind(this)
    };

  };

  public getChildren(node: TreeNode) {
    this.dbFolderService.loadFolder(node.data.id);
  }

  public selectNode(event) {
    let node: TreeNode = event.node;
    switch (node.data.type) {
      case 'root':
        this.dbAdminService.selectDbRoot();
        return;
      case 'dbFolder':
        this.dbAdminService.selectDbFolder(node.data.id);
        return;
      case 'dbStream':
        this.dbAdminService.selectDbStream(node.data.id);
        return;
      default:
        console.log(`unknown type ${node.data.type}`);
    }
  }

  ngOnInit() {
    this.nilm
      .combineLatest(this.dbs$)
      .subscribe(([nilm, dbs]) => {
        console.log(nilm.db_id,dbs);
        if (dbs[nilm.db_id] === undefined) {
          this.dbService.loadDb(nilm.db_id);
        }
      })
    this.nilm
      .subscribe(nilm => {
        this.dbAdminService.setDbId(nilm.db_id);
        this.dbAdminService.selectDbRoot();
      })
  }

}
