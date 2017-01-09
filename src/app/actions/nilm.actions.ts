import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { INilmdb } from '../store';
import { Http, URLSearchParams } from '@angular/http';


@Injectable()
export class NilmActions {
  static REQUEST_NILMS = 'NILM_REQUEST_NILMS';
  static RECEIVE_NILMS = 'NILM_RECEIVE_NILMS';

  constructor(
    private http: Http,
    private ngRedux: NgRedux<IAppState>
  ) { }

  public loadNilms() {
    this._requestNilms();
    this.http
      .get('http://localhost:3000/dbs/72.json', {})
      .map(resp => resp.json())
      .toPromise()
      .then(json => this._receiveNilms(json));
  }

  private _requestNilms() {
    this.ngRedux.dispatch({
      type: NilmActions.REQUEST_NILMS
    });
  }
  private _receiveNilms(db: INilmdb) {
    this.ngRedux.dispatch({
      type: NilmActions.RECEIVE_NILMS,
      payload: [db]
    });
  }

}
