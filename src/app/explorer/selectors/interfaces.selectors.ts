
import {withLatestFrom} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { select } from '@angular-redux/store';
import * as _ from 'lodash';

import { IAppState } from '../../app.store';

export const INTERFACES_REDUX= ['ui','explorer','interfaces'];

import {
  IDataApp, IDataAppRecords
} from '../../store/data';

@Injectable()
export class InterfacesSelectors {
  @select(_.concat(INTERFACES_REDUX, 'displayed')) displayedIds$: Observable<number[]>
  @select(_.concat(INTERFACES_REDUX, 'selected')) selectedId$: Observable<number>
  @select(['data', 'dataApps']) apps$: Observable<IDataAppRecords>;

  public displayed$: Observable<IDataApp[]>
  public noneDisplayed$: Observable<boolean>

  constructor(
    private ngRedux: NgRedux<IAppState>
  ){

    this.displayed$ = this.displayedIds$.pipe(
      withLatestFrom(this.apps$),
      map(([ids, apps]) => ids.map(id => apps[id])),
      filter(module => module !== undefined));

    this.noneDisplayed$ = this.displayedIds$
      .pipe(map(ids => ids.length==0))
  }
}
