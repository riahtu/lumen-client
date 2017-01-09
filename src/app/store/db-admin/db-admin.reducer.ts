
import { IPayloadAction } from '../../actions';
import { DbAdminActions } from '../../actions';
import {INITIAL_STATE} from './db-admin.initial-state';

export function dbAdminReducer(
  state = INITIAL_STATE,
  action: IPayloadAction) {
  switch (action.type) {
    case DbAdminActions.SELECT_ITEM:
      return Object.assign({}, state,
        {
          selected_id: action.payload.id,
          selected_type: action.payload.type
        });
    case DbAdminActions.SET_NILM_ID:
      return Object.assign({}, state,
        {
          nilmId: action.payload.id
        });
    default:
      return state;
  }
}
