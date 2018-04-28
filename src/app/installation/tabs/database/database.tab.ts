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

  @Input() nilm: INilm;
  @select(['data', 'dbs']) dbs$: Observable<IDbRecords>;

  private subs: Subscription[];
  //public myNilm: INilm;

  constructor(
    public dbService: DbService,
    private installationService: InstallationService,
    private dbFolderService: DbFolderService,
    public installationSelectors: InstallationSelectors,
  ) {
    this.subs = [];
  };

  public toggleNode(event: any){
    if(event.isExpanded == false)
      return; //nothing to do
    let node = event.node;
    if(node.hasChildren && node.children == null){
      this.dbFolderService.loadFolder(node.data.dbId);
    }
  }

  public refresh(){
    this.installationService.refreshNilm(this.nilm);
  }
  public selectNode(event) {
    let node: TreeNode = event.node;
    switch (node.data.type) {
      case 'root':
        this.installationService.selectDbRoot();
        return;
      case 'dbFolder':
        this.installationService.selectDbFolder(node.data.dbId);
        return;
      case 'dbStream':
        this.installationService.selectDbStream(node.data.dbId);
        return;
      default:
        console.log(`unknown type ${node.data.type}`);
    }
  }

  ngOnInit() {
    this.installationService.setDbId(this.nilm.db);
    this.installationService.selectDbRoot();

  }

  ngOnDestroy() {
    for (var sub of this.subs) {
      sub.unsubscribe();
    }
  }
}
