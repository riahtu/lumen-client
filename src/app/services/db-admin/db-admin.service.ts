import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { TreeNode } from 'angular2-tree-component';
import {
  IAppState,
} from '../../store';

import {
  DbAdminActions
} from '../../store/db-admin';

import {
  PageActions
} from '../../store';

import {
  IStatusMessages,
} from '../../store';
import {
  IDb,
  IDbFolder,
  IDbStream,
  IDbElement
} from '../../store/data';
import { MessageService } from '../message.service';

@Injectable()
export class DbAdminService {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService
  ) { }

  // ---selectDbRoot: pick the root from tree -----
  public selectDbRoot() {
    this.ngRedux.dispatch({
      type: DbAdminActions.SELECT_DB_ROOT,
      payload: {}
    });
    this.messageService.clearMessages();
  }

  // ---selectDbFolder: pick folder from tree -----
  public selectDbFolder(id: number) {
    this.ngRedux.dispatch({
      type: DbAdminActions.SELECT_DB_FOLDER,
      payload: {
        id: id,
      }
    });
    this.messageService.clearMessages();
  }


  // ---selectDbStream: pick a stream from tree---
  public selectDbStream(id: number) {
    this.ngRedux.dispatch({
      type: DbAdminActions.SELECT_DB_STREAM,
      payload: {
        id: id,
      }
    });
    this.messageService.clearMessages();
  }



  // ---setDbId: work on specified Db -----
  public setDbId(id: number) {
    /* assume we have the database in the store
    let dbIds = this.ngRedux.getState().data.dbs;
    if(!(id in dbIds)){
      this.nilmService.loadNilm(id)
        .subscribe(success => {},
        error => {
          this.ngRedux.dispatch({
          type: PageActions.SET_MESSAGES,
            payload: parseErrors(error)
          })
        })
    }*/
    // set the new db id
    this.ngRedux.dispatch({
      type: DbAdminActions.SET_DB_ID,
      payload: {
        id: id
      }
    });
  }

}
