
import * as ui from './store/ui';
import * as data from './store/data';
import * as installation from './installation/store';
import * as explorer from './explorer/store';
import * as account from './account/store';
import {combineReducers } from 'redux';

//create the app state and root reducer
//    UI Management
interface IUIState {
  global?: ui.IState,
  installation?: installation.IState,
  explorer?: explorer.IState,
  account?: account.IState
}
let uiReducer = combineReducers<IUIState>({
  global: ui.reducer,
  installation: installation.reducer,
  explorer: explorer.reducer,
  account: account.reducer
})
//   TOP LEVEL: UI, Data
export interface IAppState {
  ui?: IUIState,
  data?: data.IState
}
export const rootReducer = combineReducers<IAppState>({
  ui: uiReducer,
  data: data.reducer
})