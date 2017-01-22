import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as schema from '../../api';

import {
  IAppState,
} from '../../store';
import {
    IStatusMessages,
} from '../../store/db-admin';

import {
  IDbFolder,
  DbFolderActions,
  DbStreamActions,
  DbElementActions,
} from '../../store/data';

@Injectable()
export class DbFolderService {


  constructor(
    private http: Http,
    private ngRedux: NgRedux<IAppState>
  ) { }



  public loadFolder(dbFolderId): Observable<any> {
    return this.http
      .get(`http://localhost:3000/db_folders/${dbFolderId}.json`, {})
      .map(resp => resp.json())
      .do(json => this._dispatch(json));
  }

  public updateFolder(dbFolder: IDbFolder): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .put(`http://localhost:3000/db_folders/${dbFolder.id}.json`,
      JSON.stringify(dbFolder), options)
      .map(resp => resp.json())
      .do(json => this._dispatch(json))
  }

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
