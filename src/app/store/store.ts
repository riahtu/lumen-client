
import { combineReducers } from 'redux';
import * as data from './data';
import * as dbAdmin from './db-admin';
import * as page from './page'

export interface IAppState {
  data?: data.IDataState;
  dbAdmin?: dbAdmin.IDbAdminRecord;
  page?: page.IPageRecord;
}


export const rootReducer = combineReducers<IAppState>({
  data: data.dataReducer,
  dbAdmin: dbAdmin.dbAdminReducer,
  page: page.pageReducer
});
