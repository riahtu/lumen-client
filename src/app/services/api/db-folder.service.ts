import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { Angular2TokenService } from 'angular2-token';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as schema from '../../api';
import { MessageService } from '../message.service';
import { IAppState } from '../../app.store';

import {
  IDbFolder,
  IDbStream,
  IDbElement,
  DbFolderActions,
  DbStreamActions,
  DbElementActions,
} from '../../store/data';

@Injectable()
export class DbFolderService {


  constructor(
    private tokenService: Angular2TokenService,
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService
  ) { }


  public loadFolder(dbFolderId): void {
    
    this.tokenService
      .get(`db_folders/${dbFolderId}.json`, {})
      .map(resp => resp.json())
      .subscribe(
      json => this._dispatch(json),
      error => this.messageService.setErrorsFromAPICall(error));
  }

  public updateFolder(dbFolder: IDbFolder): void {
    this.tokenService
      .put(`db_folders/${dbFolder.id}.json`, JSON.stringify(dbFolder))
      .map(resp => resp.json())
      .subscribe(
        json => {
          this._dispatch(json.data);
          this.messageService.setMessages(json.messages);
        },
        error => this.messageService.setErrorsFromAPICall(error));  
  }

  // -------- private helper functions --------
  private _dispatch(json) {
    let entities = normalize(json, schema.dbFolder).entities;
    this._receive(DbFolderActions, entities['dbFolders']);
    this._receive(DbStreamActions, entities['dbStreams']);
    this._receive(DbElementActions, entities['dbElements']);
  }
  private _receive(target: any, data: any) {
    if (!(data === undefined)) {
      this.ngRedux.dispatch({
        type: target.RECEIVE,
        payload: data
      });
    }
  }

}
