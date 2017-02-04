import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { PageActions } from '../store';
import { Observable } from 'rxjs/Observable';

const BASE_URL = '/api';

@Injectable()
export class PageEpics {
  constructor() {}

  page = action$ => {
    return action$.ofType(PageActions.SET_MESSAGES)
      .do(x => console.log(x))
      .delay(5000)
      .mapTo({
        type: PageActions.CLEAR_MESSAGES
      });
  }
}