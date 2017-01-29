
import {
  IDbAdmin,
  IDbAdminRecord,
  IStatusMessages,
  IStatusMessagesRecord,
} from './db-admin.types';
import { makeTypedFactory } from 'typed-immutable-record';

export const StatusMessagesFactory =
  makeTypedFactory<IStatusMessages, IStatusMessagesRecord>({
    notices: [],
    errors: [],
    warnings: []
  });

// ---- DbAdmin ----
export const DbAdminFactory =
  makeTypedFactory<IDbAdmin, IDbAdminRecord>({
    selectedType: 'unknown',
    selectedDbFolder: null,
    selectedDbStream: null,
    selectedDb: null,
    dbMessages: StatusMessagesFactory(),
    dbFolderMessages: StatusMessagesFactory(),
    dbStreamMessages: StatusMessagesFactory(),
    pageMessages: StatusMessagesFactory(),
  });


export const INITIAL_STATE = DbAdminFactory();
