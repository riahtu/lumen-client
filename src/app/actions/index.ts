import { Action } from 'redux';
import {NilmActions} from './nilm.actions';
import {DbAdminActions} from './db-admin.actions';

export interface IPayloadAction extends Action {
  payload?: any;
}

export const ACTION_PROVIDERS = [NilmActions, DbAdminActions];
export {NilmActions, DbAdminActions};
