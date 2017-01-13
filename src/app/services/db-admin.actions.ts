import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { TreeNode } from 'angular2-tree-component';
import { IAppState } from '../store';

// add observable tree node mapping here

@Injectable()
export class DbAdminActions {
  static SELECT_ITEM = 'DBADMIN_SELECT_ITEM';
  static SET_NILM_ID = 'DBADMIN_SET_NILM_ID';

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

  public setNilmId(id: number) {
    this.ngRedux.dispatch({
      type: DbAdminActions.SET_NILM_ID,
      payload: {
        id: id
      }
    })
  }
}
