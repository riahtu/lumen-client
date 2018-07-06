import { combineReducers } from 'redux';
import * as types from './types';
import * as reducers from './reducer';

export interface IState {
  nilms: types.INilmRecords;
  jouleModules: types.IJouleModuleRecords;
  dbFolders: types.IDbFolderRecords;
  dbStreams: types.IDbStreamRecords;
  dbElements: types.IDbElementRecords;
  users: types.IUserStoreRecord;
  userGroups: types.IUserGroupStoreRecord;
  permissions: types.IPermissionRecords;
  dataViews: types.IDataViewRecords;
}

export const reducer = combineReducers<IState>({
  nilms: reducers.nilmReducer,
  jouleModules: reducers.jouleModuleReducer,
  dbFolders: reducers.dbFolderReducer,
  dbStreams: reducers.dbStreamReducer,
  dbElements: reducers.dbElementReducer,
  permissions: reducers.permissionReducer,
  users: reducers.userReducer,
  userGroups: reducers.userGroupReducer,
  dataViews: reducers.dataViewReducer,
});
export {DataFactory, DataViewFactory } from './initial-state';
export * from './actions';
export * from './types';
