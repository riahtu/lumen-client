
import { combineReducers } from 'redux';
import { Nilm } from './nilm';

export interface INilmState {
  nilms: Nilm[];
}
let defaultState: INilmState = {
  nilms: []
};

export function nilmReducer(state = defaultState, action) {
  switch (action.type) {
    case 'REQUEST_NILMS':
      return Object.assign({}, state,
        { nilms: [] });
    case 'RECEIVE_NILMS':
      return Object.assign({}, state,
        { nilms: action.nilms });
    default:
      return state;
  }
}


export const rootReducer = combineReducers({
  nilmReducer
});
