
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
    right_units: 'none'
  });


export const INITIAL_STATE = ExplorerFactory();
