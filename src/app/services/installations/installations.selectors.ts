import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import {
  IAppState,
  IDataState,
  INilmRecords,
  INilmRecord,
  IStatusMessages
} from '../../store';

import { Observable } from 'rxjs';
import { select } from 'ng2-redux';


@Injectable()
export class InstallationsSelectors {

  @select(['data', 'nilms']) nilmDict$: Observable<INilmRecords>;
  @select(['installations', 'pageMessages']) pageMessages$: Observable<IStatusMessages>;

  //array of INilmRecord objects (converted from dictionary format used in store)
  public nilms$: Observable<INilmRecord[]>;

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { 
     this.nilms$ = this.nilmDict$
        .map(records => Object.keys(records).map(key => records[key]))
  }
}