import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActionsObservable } from 'redux-observable';
import { SessionActions } from '../actions/session.actions';
import { Observable } from 'rxjs/Observable';
import { Epic } from 'redux-observable';
import { IPayloadAction } from '../store';
import {IAppState} from '../app.store';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const BASE_URL = '/api';


@Injectable()
export class SessionEpics {

  public epics: Epic<IPayloadAction, IAppState>[];

  constructor(private http: Http) {
    this.epics = [ this.login ];
  }

  login = action$ => {
    return action$.ofType(SessionActions.LOGIN_USER)
      .mergeMap(({payload}) => {
        return this.http.post(`${BASE_URL}/auth/login`, payload)
          .map(result => ({
            type: SessionActions.LOGIN_USER_SUCCESS,
            payload: result.json().meta
          }))
          .catch(error => Observable.of({
            type: SessionActions.LOGIN_USER_ERROR
          }));
        });
  }

}