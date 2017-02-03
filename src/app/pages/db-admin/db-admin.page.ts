import { Component, Input, OnInit } from '@angular/core';

import {
  NilmService,
  DbAdminService,
  DbAdminSelectors,
} from '../../services';


import { TreeNode } from 'angular2-tree-component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-db-admin',
  templateUrl: './db-admin.page.html',
  styleUrls: ['./db-admin.page.css']
})
export class DbAdminPageComponent implements OnInit {

  @Input() dbId: Observable<number>

  public treeOptions = {};

  constructor(
    private nilmService: NilmService,
    private dbAdminService: DbAdminService,
    public dbAdminSelectors: DbAdminSelectors,
  ) {
    this.treeOptions = {
      getChildren: this.getChildren.bind(this)
    };
  };

  public getChildren(node: TreeNode) {
   this.dbAdminService.loadDbFolder(node.data.id);
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
    this.dbId.subscribe(id => {
      this.dbAdminService.setDbId(id);
      this.dbAdminService.selectDbRoot();
    })
  }

}
