
import {IDbAdmin,
  IDbAdminRecord } from './db-admin.types';
import { makeTypedFactory } from 'typed-immutable-record';

// ---- DbAdmin ----
export const DbAdminFactory =
  makeTypedFactory<IDbAdmin, IDbAdminRecord>({
    selectedType: 'unknown',
    selectedDbFolder: null,
    selectedDbStream: null,
    selectedDb: null
  });

export const INITIAL_STATE = DbAdminFactory();
