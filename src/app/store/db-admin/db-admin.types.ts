import { TypedRecord } from 'typed-immutable-record';

import {IStatusMessagesRecord} from '../helpers';

// ---- DbAdmin ----
export interface IDbAdmin {
  selectedType: string;
  selectedDbFolder: number;
  selectedDbStream: number;
  selectedDb: number;
  dbMessages: IStatusMessagesRecord;
  dbFolderMessages: IStatusMessagesRecord;
  dbStreamMessages: IStatusMessagesRecord;
  pageMessages: IStatusMessagesRecord;
}

export interface IDbAdminRecord extends
  TypedRecord<IDbAdminRecord>, IDbAdmin { };
