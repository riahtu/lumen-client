import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as schema from '../api';

import {
  IAppState,
  IDbFolder
} from '../store';
import {
  DbFolderActions,
  DbStreamActions,
  DbElementActions
} from '../store/data';

@Injectable()
export class DbFolderService {


  constructor(
    private http: Http,
    private ngRedux: NgRedux<IAppState>
  ) { }



  public loadFolder(dbFolderId) {
    this.http
      .get(`http://localhost:3000/db_folders/${dbFolderId}.json`, {})
      .map(resp => resp.json())
      .toPromise()
      .then(json => this._dispatch(json));
  }

  public updateFolder(dbFolder: IDbFolder,
    onError = error => console.log(error)) {
    console.log(JSON.stringify(dbFolder));
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http
      .put(`http://localhost:3000/db_folders/${dbFolder.id}.json`,
      JSON.stringify(dbFolder),options)
      .map(resp => resp.json())
      .toPromise()
      .then(json => this._dispatch(json),
      json => onError(json));

  }

  private _dispatch(json) {
    let entities = normalize(json, schema.dbFolder).entities;
    console.log(entities);
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
