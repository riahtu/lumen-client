import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { INilmState } from './store';
import { Nilm } from './nilm';
import { Http, URLSearchParams } from '@angular/http';


@Injectable()
export class NilmService {

  constructor(
    private http: Http,
    private ngRedux: NgRedux<INilmState>
  ) {

  }

  public loadNilms() {
    this._requestNilms();
    this.http
      .get('http://localhost:3000/nilms.json', {})
      .map(resp => resp.json())
      .map(json => json.map(item => Nilm.fromJSON(item)))
      .toPromise()
      .then(nilms => this._receiveNilms(nilms));
  }

  private _requestNilms() {
    this.ngRedux.dispatch({
      type: 'REQUEST_NILMS'
    });
  }
  private _receiveNilms(nilms) {
    this.ngRedux.dispatch({
      type: 'RECEIVE_NILMS',
      nilms: nilms
    });
  }

}
