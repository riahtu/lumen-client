import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { TreeNode } from 'angular-tree-component';
import {
  IAppState,
} from '../app.store';

import { InstallationActions } from './store';

import {
  INilm,
  IDb,
  IDbFolder,
  IDbStream,
  IDbElement
} from '../store/data';
import { 
  NilmService,
  MessageService 
} from '../services/';

@Injectable()
export class InstallationService {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService,
    private nilmService: NilmService
  ) { }

  // ---selectDbRoot: pick the root from tree -----
  public selectDbRoot() {
    this.ngRedux.dispatch({
      type: InstallationActions.SELECT_DB_ROOT,
      payload: {}
    });
    //this.messageService.clearMessages();
  }

  // ---selectDbFolder: pick folder from tree -----
  public selectDbFolder(id: number) {
    this.ngRedux.dispatch({
      type: InstallationActions.SELECT_DB_FOLDER,
      payload: {
        id: id,
      }
    });
    this.messageService.clearMessages();
  }

  // ---selectDbStream: pick a stream from tree---
  public selectDbStream(id: number) {
    this.ngRedux.dispatch({
      type: InstallationActions.SELECT_DB_STREAM,
      payload: {
        id: id,
      }
    });
    this.messageService.clearMessages();
  }

  // ---setDbId: work on specified Db -----
  public setDbId(id: number) {
    // set the new db id
    this.ngRedux.dispatch({
      type: InstallationActions.SET_DB_ID,
      payload: {
        id: id
      }
    });
  }

  // ---refreshInstallation: refresh current installation ----
  public refreshNilm(nilm: INilm){
    this.ngRedux.dispatch({
      type: InstallationActions.REFRESHING
    })
    this.nilmService.refreshNilm(nilm.id).subscribe(
      success => this.notBusy(),
      error => this.notBusy()
    );
  }

  private notBusy(){
    this.ngRedux.dispatch({
      type:InstallationActions.NOT_BUSY
    })
  }

}
