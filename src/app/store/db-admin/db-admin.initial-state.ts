
import {
  IDbAdmin,
  IDbAdminRecord,
} from './db-admin.types';

import {
  StatusMessagesFactory
} from '../helpers';

import { makeTypedFactory } from 'typed-immutable-record';


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
