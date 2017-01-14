import { combineReducers } from 'redux';
import * as types from './data.types';
import * as reducers from './data.reducer';

export interface IDataState {
  nilms: types.INilmRecords;
  dbs: types.IDbRecords;
  dbFolders: types.IDbFolderRecords;
}

export const dataReducer = combineReducers<IDataState>({
  nilms: reducers.nilmReducer,
  dbs: reducers.dbReducer,
  dbFolders: reducers.dbFolderReducer,
  dbStreams: reducers.dbStreamReducer
});

export * from './data.actions';
export * from './data.types';
