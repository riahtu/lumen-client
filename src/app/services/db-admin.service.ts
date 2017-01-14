import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { TreeNode } from 'angular2-tree-component';
import { IAppState,
  DbAdminActions } from '../store';

@Injectable()
export class DbAdminService {

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  public selectItem(node: TreeNode) {
    this.ngRedux.dispatch({
      type: DbAdminActions.SELECT_ITEM,
      payload: {
        id: node.data.id,
        type: node.data.type
      }
    });
  }

  public setDbId(id: number) {
    this.ngRedux.dispatch({
      type: DbAdminActions.SET_DB_ID,
      payload: {
        id: id
      }
    })
  }
}
