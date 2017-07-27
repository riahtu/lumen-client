import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import {
  MeasurementActions,
  IRange,
} from '../store';
import {
  MeasurementSelectors,
  PlotSelectors
} from '../selectors';
import { IMeasurementSet } from '../store/measurement';
import { IData } from '../../store/data';
import { PlotService } from './plot.service';
import { IAppState } from '../../app.store';

@Injectable()
export class MeasurementService {


  constructor(
    private ngRedux: NgRedux<IAppState>,
    private plotService: PlotService,
    private measurementSelectors: MeasurementSelectors,
    private plotSelectors: PlotSelectors
  ) {
  }

  //start measurement mode
  //
  public startMeasurement() {
    this.ngRedux.dispatch({
      type: MeasurementActions.ENABLE
    })
  }

  //exit measurement mode
  //
  public cancelMeasurement() {
    this.ngRedux.dispatch({
      type: MeasurementActions.DISABLE
    })
  }

  //makeMeasurement
  //  make a measurement over the specified range
  //
  public setRange(range: IRange) {
    this.ngRedux.dispatch({
      type: MeasurementActions.SET_RANGE,
      payload: range
    })
  }

  //set zero to current measurement range
  //
  public setZero() {
    this.ngRedux.dispatch({
      type: MeasurementActions.SET_ZERO,
    })
  }

  //remove the zero
  public clearZero(){
    this.ngRedux.dispatch({
      type: MeasurementActions.CLEAR_ZERO
    })
  }

  //set whether the measurement is relative
  //
  public setRelative(x: boolean) {
    this.ngRedux.dispatch({
      type: MeasurementActions.SET_RELATIVE,
      payload: x
    })
  }

  //set the direct measurements
  //
  public setDirectMeasurements(measurements: IMeasurementSet) {
    this.ngRedux.dispatch({
      type: MeasurementActions.SET_DIRECT_MEASUREMENTS,
      payload: measurements
    })
  }

  //set the relative measurements
  //
  public setRelativeMeasurements(measurements: IMeasurementSet) {
    this.ngRedux.dispatch({
      type: MeasurementActions.SET_RELATIVE_MEASUREMENTS,
      payload: measurements
    })
  }
}
