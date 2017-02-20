import { combineReducers } from 'redux';
import * as types from './data.types';
import * as reducers from './data.reducer';

export interface IDataState {
  nilms: types.INilmStoreRecord;
  dbs: types.IDbRecords;
  dbFolders: types.IDbFolderRecords;
  dbStreams: types.IDbStreamRecords;
  dbElements: types.IDbElementRecords;
  user: types.IUserRecord;
  permissions: types.IPermissionRecords;
}

export const dataReducer = combineReducers<IDataState>({
  nilms: reducers.nilmReducer,
  dbs: reducers.dbReducer,
  dbFolders: reducers.dbFolderReducer,
  dbStreams: reducers.dbStreamReducer,
  dbElements: reducers.dbElementReducer,
  permissions: reducers.permissionReducer,
  user: reducers.userReducer
});

export * from './data.actions';
export * from './data.types';
