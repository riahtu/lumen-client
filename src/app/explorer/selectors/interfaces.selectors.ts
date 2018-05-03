import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import * as _ from 'lodash';

import { IAppState } from '../../app.store';

export const INTERFACES_REDUX= ['ui','explorer','interfaces'];

import {
  IJouleModule, IJouleModuleRecords
} from '../../store/data';

@Injectable()
export class InterfacesSelectors {
  @select(_.concat(INTERFACES_REDUX, 'displayed')) displayedIds$: Observable<number[]>
  @select(_.concat(INTERFACES_REDUX, 'selected')) selectedId$: Observable<number>
  @select(['data', 'jouleModules']) modules$: Observable<IJouleModuleRecords>;

  public displayed$: Observable<IJouleModule[]>
  public noneDisplayed$: Observable<boolean>

  constructor(
    private ngRedux: NgRedux<IAppState>
  ){

    this.displayed$ = this.displayedIds$
    .combineLatest(this.modules$)
    .map(([ids, modules]) => ids.map(id => modules[id]))
    .filter(module => module !== undefined)

    this.noneDisplayed$ = this.displayedIds$
      .map(ids => ids.length==0)
  }
}
