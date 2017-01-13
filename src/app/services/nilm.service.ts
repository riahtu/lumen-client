import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { IDb, NilmFactory} from '../store';
import * as nilm from '../store/nilm';
import { Http, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as schema from '../api';
import { makeTypedFactory } from 'typed-immutable-record';


@Injectable()
export class NilmActions {
  static REQUEST_NILMS = 'NILM_REQUEST_NILMS';
  static RECEIVE_NILMS = 'NILM_RECEIVE_NILMS';
  static RECEIVE_DBFOLDER = 'NILM_RECEIVE_DBFOLDER';

  constructor(
    private http: Http,
    private ngRedux: NgRedux<IAppState>
  ) { }

  public loadNilms() {
    this._requestNilms();
    this.http
      .get('http://localhost:3000/nilms.json', {})
      .map(resp => resp.json())
      .toPromise()
      .then(json => {
        let entities = normalize(json, schema.nilms).entities
        this._receive(NilmActions, entities['nilms']);
        this._receive(DbActions, entities['dbs']);
        this._receive(DbFolderActions, entities['dbFolders']);
        this._receive(DbStreamActions, entities['dbStreams']);

      });
    //convert to records
    //... dbFolders, dbStreams, nilms, dbs ...
    //dispatch receiveFolders, receiveDbs, receiveStreams....
    //each hits their own reducer, no deep maps, all typed :)
    //....https://github.com/rangle/angular2-redux-example/blob/master/src/store/session/session.initial-state.ts

  }

  public loadFolder(dbFolderId) {
    this.http
      .get(`http://localhost:3000/db_folders/${dbFolderId}.json`, {})
      .map(resp => resp.json())
      .toPromise()
      .then(json => {
        let folder = normalize(json, schema.dbFolder);
        this._receiveDbFolder(folder);
      });
  }

  private _requestNilms() {
    this.ngRedux.dispatch({
      type: NilmActions.REQUEST_NILMS
    });
  }

  private _receive(target: any data: any) {
    this.ngRedux.dispatch({
      type: target.RECEIVE,
      payload: data
    });
  }

}
/*
export const NilmFactory = makeTypedFactory<nilm.INilm, nilm.INilmRecord>({
  id: 0,
  name: '',
  description: '',
  db: 0
});*/
