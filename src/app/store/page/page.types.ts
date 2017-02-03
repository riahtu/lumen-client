import { TypedRecord } from 'typed-immutable-record';

// ---- Installtions ----
export interface IPage {
  messages: IStatusMessagesRecord;
}

export interface IPageRecord extends
  TypedRecord<IPageRecord>, IPage { };



// ---- StatusMessages ---
export interface IStatusMessages {
  errors: string[];
  warnings: string[];
  notices: string[];
}

export interface IStatusMessagesRecord extends
  TypedRecord<IStatusMessagesRecord>, IStatusMessages { };

