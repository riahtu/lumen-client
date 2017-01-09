
import { combineReducers } from 'redux';
import * as nilm from './nilm';
import * as dbAdmin from './db-admin';

export interface IUIState {
  busy: boolean;
  dbAdmin: dbAdmin.IDbAdminState;
}
export interface IAppState {
  nilms?: nilm.INilmState;
  dbAdmin?: dbAdmin.IDbAdminState;
}


export const rootReducer = combineReducers<IAppState>({
  nilm: nilm.nilmReducer,
  dbAdmin: dbAdmin.dbAdminReducer
});
