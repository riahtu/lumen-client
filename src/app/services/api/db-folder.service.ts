import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs';
import { Angular2TokenService } from 'angular2-token';
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
    private ngRedux: NgRedux<IAppState>
  ) { }

  
  public loadFolder(dbFolderId): Observable<any> {
    return this.tokenService
      .get(`db_folders/${dbFolderId}.json`, {})
      .map(resp => resp.json())
      .do(json => this._dispatch(json));
  }

  public updateFolder(dbFolder: IDbFolder): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.tokenService
      .put(`db_folders/${dbFolder.id}.json`,
      JSON.stringify(dbFolder), options)
      .map(resp => resp.json())
      .do(json => this._dispatch(json.data))
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
