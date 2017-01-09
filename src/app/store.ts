
import { combineReducers } from 'redux';
import { INilm } from './nilm';

export interface INilmState {
  nilms: INilm[];
  nilm: null;
}
let defaultState: INilmState = {
  nilms: [],
  nilm: null
};

export function nilmReducer(state = defaultState, action) {
  switch (action.type) {
    case 'REQUEST_NILMS':
      return Object.assign({}, state,
        { nilms: [] });
    case 'RECEIVE_NILMS':
      return Object.assign({}, state,
        {
          nilms: action.nilms,
          nilm: action.nilms[0]
        });
    default:
      return state;
  }
}
