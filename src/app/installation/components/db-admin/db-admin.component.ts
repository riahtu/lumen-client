import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from 'angular2-tree-component';
import { Observable, Subscription } from 'rxjs';
import { select } from 'ng2-redux';

import {
  DbFolderService,
  DbService,
} from '../../../services';
import { InstallationService } from '../../installation.service';
import { InstallationSelectors } from '../../installation.selectors';
import {
  INilmRecord,
  IDbRecords
} from '../../../store/data';

@Component({
  selector: 'app-db-admin',
  templateUrl: './db-admin.component.html',
  styleUrls: ['./db-admin.component.css']
})
export class DbAdminComponent implements OnInit {

  @Input() nilm: Observable<INilmRecord>
  @select(['data', 'dbs']) dbs$: Observable<IDbRecords>;

  public treeOptions = {};
  private subs: Subscription[];

  constructor(
    public dbService: DbService,
    private installationService: InstallationService,
    private dbFolderService: DbFolderService,
    public installationSelectors: InstallationSelectors,
  ) {
    this.treeOptions = {
      getChildren: this.getChildren.bind(this)
    };
    this.subs = [];

  };

  public getChildren(node: TreeNode) {
    this.dbFolderService.loadFolder(node.data.id);
  }

  public selectNode(event) {
    let node: TreeNode = event.node;
    switch (node.data.type) {
      case 'root':
        this.installationService.selectDbRoot();
        return;
      case 'dbFolder':
        this.installationService.selectDbFolder(node.data.id);
        return;
      case 'dbStream':
        this.installationService.selectDbStream(node.data.id);
        return;
      default:
        console.log(`unknown type ${node.data.type}`);
    }
  }

  ngOnInit() {
    this.subs.push(
       this.nilm
        .combineLatest(this.dbs$)
        .subscribe(([nilm, dbs]) => {
          if (dbs[nilm.db_id] === undefined) {
            this.dbService.loadDb(nilm.db_id);
          }
        })
    );
    this.subs.push(
      this.nilm
        .subscribe(nilm => {
          this.installationService.setDbId(nilm.db_id);
          this.installationService.selectDbRoot();
        })
    );
  }

  ngOnDestroy(){
    for (var sub of this.subs) {
      sub.unsubscribe();
    }
  }
}
