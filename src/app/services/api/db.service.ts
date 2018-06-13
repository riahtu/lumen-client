import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient,
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService
  ) { }


  public loadDb(dbId): void {
    this.http
      .get(`dbs/${dbId}.json`, {})
      .subscribe(
      json => this._dispatch(json),
      error => this.messageService.setErrorsFromAPICall(error));
  }

  public updateDb(db: IDb): void {
    this.http
      .put<schema.IApiResponse>(`dbs/${db.id}.json`, JSON.stringify(db))
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
