import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Http, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as schema from '../api';

import { IAppState } from '../store';
import {
  NilmActions,
  DbActions,
  DbFolderActions,
  DbStreamActions,
  DbElementActions
} from '../store/data';

@Injectable()
export class NilmService {


  constructor(
    private http: Http,
    private ngRedux: NgRedux<IAppState>
  ) { }

  public loadNilms() {
    this.http
      .get('http://localhost:3000/nilms.json', {})
      .map(resp => resp.json())
      .toPromise()
      .then(json => {
        let entities = normalize(json, schema.nilms).entities;
        this._receive(NilmActions, entities['nilms']);
        this._receive(DbActions, entities['dbs']);
        this._receive(DbFolderActions, entities['dbFolders']);
        // this._receive(DbStreamActions, entities['dbStreams']);
      });
  }

  public loadFolder(dbFolderId) {
    this.http
      .get(`http://localhost:3000/db_folders/${dbFolderId}.json`, {})
      .map(resp => resp.json())
      .toPromise()
      .then(json => {
        let entities = normalize(json, schema.dbFolder).entities;
        this._receive(DbFolderActions, entities['dbFolders']);
        this._receive(DbStreamActions, entities['dbStreams']);
        this._receive(DbElementActions, entities['dbElements']);
      });
  }

  private _receive(target: any, data: any) {
    this.ngRedux.dispatch({
      type: target.RECEIVE,
      payload: data
    });
  }

}
