import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Angular2TokenService } from 'angular2-token';
import { NgRedux } from 'ng2-redux';
import { Http, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as schema from '../../api';

import { IAppState } from '../../store';
import {
  NilmActions,
  DbActions,
  DbFolderActions,
  DbStreamActions,
  DbElementActions
} from '../../store/data';

@Injectable()
export class NilmService {


  constructor(
    //private http: Http,
    private tokenService: Angular2TokenService,
    private ngRedux: NgRedux<IAppState>
  ) { }

  public loadNilms(): Observable<any> {
    return this.tokenService
      .get('nilms.json', {})
      .map(resp => resp.json())
      .do(json => this._dispatch(json, schema.nilms))
  }

  public loadNilm(nilmId): Observable<any> {
    return this.tokenService
      .get(`nilms/${nilmId}.json`, {})
      .map(resp => resp.json())
      .do(json => this._dispatch(json, schema.nilm))
  }

  private _dispatch(json, resp_schema) {
    let entities = normalize(json, resp_schema).entities;
    this._receive(NilmActions, entities['nilms']);
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
