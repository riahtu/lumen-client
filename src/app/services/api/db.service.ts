import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Angular2TokenService } from 'angular2-token';
import { NgRedux } from '@angular-redux/store';
import { Http, Headers, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';

import * as schema from '../../api';
import { MessageService } from '../message.service';
import {
  IAppState
} from '../../app.store';
import {
  IDb,
  DbActions,
  DbFolderActions,
} from '../../store/data';

@Injectable()
export class DbService {


  constructor(
    private tokenService: Angular2TokenService,
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService
  ) { }


  public loadDb(dbId): void {
    this.tokenService
      .get(`dbs/${dbId}.json`, {})
      .map(resp => resp.json())
      .subscribe(
      json => this._dispatch(json),
      error => this.messageService.setErrorsFromAPICall(error));
  }

  public updateDb(db: IDb): void {
    this.tokenService
      .put(`dbs/${db.id}.json`, JSON.stringify(db))
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
    let entities = normalize(json, schema.db).entities;
    this._receive(DbActions, entities['dbs']);
    this._receive(DbFolderActions, entities['dbFolders']);
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
