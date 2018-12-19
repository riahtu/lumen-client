import { TypedRecord } from 'typed-immutable-record';

// ---- Installtions ----
export interface IUI {
  messages: IStatusMessagesRecord;
  page_header: string,
  email_enabled: boolean
}

export interface IUIRecord extends
  TypedRecord<IUIRecord>, IUI { };



// ---- StatusMessages ---
export interface IStatusMessages {
  errors: string[];
  warnings: string[];
  notices: string[];
}

export interface IStatusMessagesRecord extends
  TypedRecord<IStatusMessagesRecord>, IStatusMessages { };

