import {
  IAccount,
  IAccountRecord
} from './types';

import { makeTypedFactory } from 'typed-immutable-record';


// ---- Account ----
export const AccountFactory =
  makeTypedFactory<IAccount, IAccountRecord>({
    nilms_loaded: false,
    data_views_loaded: false,
    user_groups_loaded: false
  });


export const INITIAL_STATE = AccountFactory();
