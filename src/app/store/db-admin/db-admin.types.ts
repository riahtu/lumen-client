import { TypedRecord } from 'typed-immutable-record';


// ---- StatusMessages ---
export interface IStatusMessages {
  errors: string[];
  warnings: string[];
  notices: string[];
}
export interface IStatusMessagesRecord extends
  TypedRecord<IStatusMessagesRecord>, IStatusMessages { };

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
