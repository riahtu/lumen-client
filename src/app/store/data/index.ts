import { combineReducers } from 'redux';
import * as types from './data.types';
import * as reducers from './data.reducer';

export interface IDataState {
  nilms: types.INilmRecords;
  dbs: types.IDbRecords;
  dbFolders: types.IDbFolderRecords;
  dbStreams: types.IDbStreamRecords;
  dbElements: types.IDbElementRecords;
}

export const dataReducer = combineReducers<IDataState>({
  nilms: reducers.nilmReducer,
  dbs: reducers.dbReducer,
  dbFolders: reducers.dbFolderReducer,
  dbStreams: reducers.dbStreamReducer,
  dbElements: reducers.dbElementReducer
});

export * from './data.actions';
export * from './data.types';
