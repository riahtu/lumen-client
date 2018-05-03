import {
  IState,
  IStateRecord
} from './types';

import {makeTypedFactory} from 'typed-immutable-record';

export const InterfaceFactory = 
makeTypedFactory<IState, IStateRecord>({
  displayed: [],
  selected: null
});

export const INITIAL_STATE = InterfaceFactory();
