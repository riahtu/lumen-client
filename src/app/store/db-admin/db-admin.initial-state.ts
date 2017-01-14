
import {IDbAdmin,
  IDbAdminRecord } from './db-admin.types';
import { makeTypedFactory } from 'typed-immutable-record';

// ---- DbAdmin ----
export const DbAdminFactory =
  makeTypedFactory<IDbAdmin, IDbAdminRecord>({
    selectedType: 'unknown',
    selectedId: 0,
    dbId: 0
  });

export const INITIAL_STATE = DbAdminFactory();
