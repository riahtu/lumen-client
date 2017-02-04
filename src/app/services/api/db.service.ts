import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Angular2TokenService } from 'angular2-token';
import { NgRedux } from 'ng2-redux';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as schema from '../../api';

import { 
  IDb,
  IAppState } from '../../store';
import {
  DbActions,
  DbFolderActions,
} from '../../store/data';

@Injectable()
export class DbService {


  constructor(
    private tokenService: Angular2TokenService,
    private ngRedux: NgRedux<IAppState>
  ) { }


  public loadDb(dbId): Observable<any> {
    return this.tokenService
      .get(`dbs/${dbId}.json`, {})
      .map(resp => resp.json())
      .do(json => this._dispatch(json));
  }

  public updateDb(db: IDb): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.tokenService
      .put(`dbs/${db.id}.json`,
        JSON.stringify(db), options)
      .map(resp => resp.json())
      .do(json => this._dispatch(json.data))
  }

  public refreshDb(db: IDb): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.tokenService
      .put(`dbs/${db.id}.json`,
        JSON.stringify(Object.assign({},db,{'refresh': true})), options)
      .map(resp => resp.json())
      .do(json => this._dispatch(json.data))
  }

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
