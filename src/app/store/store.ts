
import { combineReducers } from 'redux';
import * as data from './data';
import * as dbAdmin from './db-admin';
import * as installations from './installations'

export interface IAppState {
  data?: data.IDataState;
  dbAdmin?: dbAdmin.IDbAdminRecord;
  installations?: installations.IInstallationsRecord;
}


export const rootReducer = combineReducers<IAppState>({
  data: data.dataReducer,
  dbAdmin: dbAdmin.dbAdminReducer,
  installations: installations.installationsReducer
});
