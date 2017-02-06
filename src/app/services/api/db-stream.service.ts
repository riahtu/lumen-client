import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as schema from '../../api';

import {
  IAppState,
} from '../../store';
import {
    IStatusMessages,
} from '../../store';

import {
  IDbStream,
  IDbElement,
  DbStreamActions,
  DbElementActions,
} from '../../store/data';

@Injectable()
export class DbStreamService {


  constructor(
    private tokenService: Angular2TokenService,
    private ngRedux: NgRedux<IAppState>
  ) { }


  public updateStream(stream): Observable<any> {
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    console.log(stream);
    return this.tokenService
      .put(`db_streams/${stream.id}.json`,
      JSON.stringify({'stream': stream}))
      .map(resp => resp.json())
      .do(json => this._dispatch(json.data))
  }

  private _dispatch(json) {
    let entities = normalize(json, schema.dbStream).entities;
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
