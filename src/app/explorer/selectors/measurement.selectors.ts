import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { select } from '@angular-redux/store';
import * as _ from 'lodash';

import { IAppState } from '../../app.store';
import {
  IRange,
} from '../store';
import {IMeasurementSet} from '../store/measurement';

import {
  IState,
  INilmRecords,
  IDbElement,
  IDbElementRecords,
  IDbStream,
  IDbStreamRecords,
  IDataSet,
  IDataViewRecords,
  IDataView
} from '../../store/data';

export const MEASUREMENT_REDUX= ['ui','explorer','measurement'];

@Injectable()
export class MeasurementSelectors {
  @select(_.concat(MEASUREMENT_REDUX, 'enabled')) enabled$: Observable<boolean>
  @select(_.concat(MEASUREMENT_REDUX, 'measurement_range')) measurementRange$: Observable<IRange>
  @select(_.concat(MEASUREMENT_REDUX, 'zero_range')) zeroRange$: Observable<IRange>
  @select(_.concat(MEASUREMENT_REDUX, 'direct_measurements')) directMeasurements$: Observable<IMeasurementSet>
  @select(_.concat(MEASUREMENT_REDUX, 'relative_measurements')) relativeMeasurements$: Observable<IMeasurementSet>
  @select(_.concat(MEASUREMENT_REDUX, 'relative')) relative$: Observable<boolean>
  @select(_.concat(MEASUREMENT_REDUX, 'zero_measurements')) zeroMeasurements$: Observable<IMeasurementSet>

  public zeroSet$: Observable<boolean>

  constructor(
    private ngRedux: NgRedux<IAppState>
  ){

    this.zeroSet$ = this.zeroRange$
      .pipe(map(range => {
        if(range==null)
          return false;
        return true;
      }));
  }
}
