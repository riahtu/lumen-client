import { IPayloadAction } from '../../../store/helpers';
import { MeasurementActions } from './actions';
import {
  IState,
  IStateRecord
} from './types';

import {
  recordify
} from '../../../store/helpers';
import {
  MeasurementFactory,
  INITIAL_STATE
} from './initial-state';

import * as _ from 'lodash';


export function reducer(
  state: IStateRecord = INITIAL_STATE,
  action: IPayloadAction): IStateRecord {

  switch (action.type) {
    //enter measurement mode
    //
    case MeasurementActions.ENABLE:
      return state
        .set('enabled', true);

    //cancel measurement mode
    //
    case MeasurementActions.DISABLE:
      return state
        .set('enabled', false);

    //set the measurement range
    //
    case MeasurementActions.SET_RANGE:
      return state
        .set('measurement_range', action.payload);

    //clear the range (remove the measurement)
    //
    case MeasurementActions.CLEAR_RANGE:
      return state
        .set('measurement_range', null);
        
    //set the zero to the current measurement range
    //
    case MeasurementActions.SET_ZERO:
      return state
        .set('zero_range', state.measurement_range)
        .set('zero_measurements', state.direct_measurements);

    //set whether measurements are relative to the zero
    //
    case MeasurementActions.SET_RELATIVE:
      return state
        .set('relative', action.payload);

    //set the measurements
    //
    case MeasurementActions.SET_DIRECT_MEASUREMENTS:
      return state
        .set('direct_measurements', action.payload)

    //set the relative measurements
    //
    case MeasurementActions.SET_RELATIVE_MEASUREMENTS:
      return state
        .set('relative_measurements', action.payload);

    //update the zero measurements
    //
    case MeasurementActions.ADD_ZERO_MEASUREMENTS:
      return state
        .set('zero_measurements',
        Object.assign({}, 
          state.zero_measurements,
          action.payload))

    //clear the zero
    case MeasurementActions.CLEAR_ZERO:
      return state
          .set('zero_measurements', {})
          .set('relative', false)
          .set('zero_range', null);
    default:
      return state;
  }
}
