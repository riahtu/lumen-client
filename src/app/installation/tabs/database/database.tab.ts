import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from 'angular-tree-component';
import { Observable, Subscription } from 'rxjs';
import { select } from '@angular-redux/store';

import {
  DbFolderService,
  DbService,
} from '../../../services';
import { InstallationService } from '../../installation.service';
import { InstallationSelectors } from '../../installation.selectors';
import {
  INilm,
  IDbRecords
} from '../../../store/data';

@Component({
  selector: 'installation-database-tab',
  templateUrl: './database.tab.html',
  styleUrls: ['./database.tab.css']
})
export class DatabaseTabComponent implements OnInit {

  @Input() nilm: Observable<INilm>
  @select(['data', 'dbs']) dbs$: Observable<IDbRecords>;

  public treeOptions = {};
  private subs: Subscription[];
  public myNilm: INilm;

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
    this.myNilm = null;
  };

  public getChildren(node: TreeNode) {
    this.dbFolderService.loadFolder(node.data.id);
  }

  public refresh(){
    if(this.myNilm==null){
      console.log('error, nilm is not set');
      return;
    }
    this.installationService.refreshNilm(this.myNilm);
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
          //store nilm locally
          this.myNilm = nilm;
        })
    );
    this.subs.push(
      this.nilm
        .distinctUntilChanged((x, y) => x.id === y.id)
        .subscribe(nilm => {
          this.installationService.setDbId(nilm.db_id);
          this.installationService.selectDbRoot();
        })
    );
  }

  ngOnDestroy() {
    for (var sub of this.subs) {
      sub.unsubscribe();
    }
  }
}
