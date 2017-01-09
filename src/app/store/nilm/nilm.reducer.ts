
import { IPayloadAction } from '../../actions';
import { NilmActions } from '../../actions';
import { INilm } from './nilm.types';
import {INITIAL_STATE} from './nilm.initial-state';

export function nilmReducer(
  state = INITIAL_STATE,
  action: IPayloadAction) {
  switch (action.type) {
    case NilmActions.REQUEST_NILMS:
      return Object.assign({}, state,
        { nilmsById: {} });
    case NilmActions.RECEIVE_NILMS:
      let nilms = <INilm[]>action.payload;
      let nilmsById = nilms
        .reduce((acc, nilm) => {
          acc[nilm.id] = nilm;
          return acc;
        }, {});
      return Object.assign({}, state,
        {
          nilmsById: nilmsById
        });
    default:
      return state;
  }
}
