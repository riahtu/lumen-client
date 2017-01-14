
import { IPayloadAction } from '../helpers';
import { DbAdminActions } from './db-admin.actions';
import { IDbAdminRecord } from './db-admin.types';
import { INITIAL_STATE } from './db-admin.initial-state';

export function dbAdminReducer(
  state: IDbAdminRecord = INITIAL_STATE,
  action: IPayloadAction): IDbAdminRecord {
  switch (action.type) {
    case DbAdminActions.SELECT_ITEM:
      return state.merge({
        selectedId: action.payload.id,
        selectedType: action.payload.type
      });
    case DbAdminActions.SET_DB_ID:
      return state.merge({
        dbId: action.payload.id
      });
    default:
      return state;
  }
}
