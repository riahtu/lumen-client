
import { combineReducers } from 'redux';
import * as data from './data';
import * as dbAdmin from './db-admin';


export interface IAppState {
  data?: data.IDataState;
  dbAdmin?: dbAdmin.IDbAdminRecord;
}


export const rootReducer = combineReducers<IAppState>({
  data: data.dataReducer,
  dbAdmin: dbAdmin.dbAdminReducer
});
