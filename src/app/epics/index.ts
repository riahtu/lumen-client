import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable';
import {PageEpics} from './page.epics';
import {SessionEpics } from './session.epics';
import { Epic } from 'redux-observable';
import { 
  IAppState,
  IPayloadAction 
} from '../store';


@Injectable()
export class AppEpics {
  public root: Epic<IPayloadAction, IAppState>;
 
  constructor(
    private pageEpics: PageEpics,
    private sessionEpics: SessionEpics) {
    this.root = combineEpics(
      ...pageEpics.epics,
      ...sessionEpics.epics);
  }
}

export const EPIC_PROVIDERS = [PageEpics, SessionEpics, AppEpics];
