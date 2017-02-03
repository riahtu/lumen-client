import { TypedRecord } from 'typed-immutable-record';
import { IStatusMessagesRecord } from '../helpers'
// ---- Installtions ----
export interface IPage {
  messages: IStatusMessagesRecord;
}

export interface IPageRecord extends
  TypedRecord<IPageRecord>, IPage { };
