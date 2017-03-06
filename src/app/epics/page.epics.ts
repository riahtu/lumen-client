import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { UIActions } from '../store/ui';
import { Observable } from 'rxjs/Observable';
import { Epic } from 'redux-observable';
import { IPayloadAction } from '../store';
import {   IAppState } from '../app.store';
const BASE_URL = '/api';

@Injectable()
export class PageEpics {

  public epics: Epic<IPayloadAction, IAppState>[];

  constructor() {
    this.epics = [ this.messages ]
  }

  messages = action$ => {
    return action$.ofType(UIActions.SET_MESSAGES)
      .delay(5000)
      .mapTo({
        type: UIActions.CLEAR_MESSAGES
      });
  }
}