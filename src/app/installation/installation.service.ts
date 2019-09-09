import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { TreeNode } from 'angular-tree-component';

import { normalize } from 'normalizr';
import {
  IAppState,
} from '../app.store';

import * as schema from '../api';

import { InstallationActions } from './store';
import { DataAppActions } from '../store/data';

import {
  INilm,
  IDbFolder,
  IDbStream,
  IDbElement
} from '../store/data';
import { 
  NilmService,
  MessageService 
} from '../services/';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InstallationService {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService,
    private nilmService: NilmService,
    private http: HttpClient
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

  // ---selectJouleModule: pick an interface from tree---
  public selectDataApp(id: number){
    console.log("selected app!")
    this.http
      .get(`app/${id}.json`)
      .subscribe(
      json => {
        let entities = normalize(json, schema.dataApp).entities;
        this.ngRedux.dispatch({
          type: DataAppActions.RECEIVE,
          payload: entities.dataApps
        })
      })
      this.ngRedux.dispatch({
        type: InstallationActions.SELECT_DATA_APP,
        payload: {
          id: id,
        }
      });
    this.messageService.clearMessages();
  }

  // ---setNilm: work on specified NILM -----
  public setNilm(id: number) {
    // set the new db id
    this.ngRedux.dispatch({
      type: InstallationActions.SET_NILM,
      payload: {
        id: id
      }
    });
  }

  // ---refreshInstallation: refresh current installation ----
  public refresh(){
    this.ngRedux.dispatch({
      type: InstallationActions.REFRESHING
    })
    let nilm = this.ngRedux.getState().ui.installation.nilm;
    this.nilmService.refreshNilm(nilm).subscribe(
      success => this.ngRedux.dispatch({type: InstallationActions.REFRESHED}),
      error => this.ngRedux.dispatch({type: InstallationActions.REFRESHED})
    );
  }

}
