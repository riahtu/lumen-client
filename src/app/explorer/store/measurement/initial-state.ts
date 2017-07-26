
import {
  IState,
  IStateRecord,
} from './types';

import { makeTypedFactory } from 'typed-immutable-record';


// ---- Plot ----
export const MeasurementFactory =
  makeTypedFactory<IState, IStateRecord>({
    enabled: false,
    measurement_range: null,
    zero_range: null,
    direct_measurements: {},
    relative_measurements: {},
    relative: false,
    zero_measurements: {}
  });


export const INITIAL_STATE = MeasurementFactory();
