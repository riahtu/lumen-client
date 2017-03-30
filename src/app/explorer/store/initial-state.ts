
import {
  IExplorer,
  IExplorerRecord,
} from './types';

import { makeTypedFactory } from 'typed-immutable-record';


// ---- Explorer ----
export const ExplorerFactory =
  makeTypedFactory<IExplorer, IExplorerRecord>({
    left_elements: [],
    right_elements: [],
    left_units: 'none',
    right_units: 'none',
    nav_y1: {min: null, max: null},
    nav_y2: {min: null, max: null},
    nav_time: {min: null, max: null},
    nav_data: {},
    plot_y1: {min: null, max: null},
    plot_y2: {min: null, max: null},
    plot_time: {min: null, max: null},
    plot_data: {}
  });


export const INITIAL_STATE = ExplorerFactory();
