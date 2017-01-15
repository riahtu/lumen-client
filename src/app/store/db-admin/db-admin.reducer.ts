
import { IPayloadAction } from '../helpers';
import { DbAdminActions } from './db-admin.actions';
import { IDbAdminRecord } from './db-admin.types';
import { INITIAL_STATE } from './db-admin.initial-state';

export function dbAdminReducer(
  state: IDbAdminRecord = INITIAL_STATE,
  action: IPayloadAction): IDbAdminRecord {
  switch (action.type) {
    case DbAdminActions.SELECT_DB_FOLDER:
      return state.merge({
        selectedDbFolder: action.payload.id,
        selectedType: 'dbFolder'
      });
    case DbAdminActions.SELECT_DB_STREAM:
      return state.merge({
        selectedDbStream: action.payload.id,
        selectedType: 'dbStream'
      });
    case DbAdminActions.SET_DB_ID:
      return state.merge({
        selectedDb: action.payload.id
      });
    default:
      return state;
  }
}
