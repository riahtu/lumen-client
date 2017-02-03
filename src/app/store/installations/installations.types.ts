import { TypedRecord } from 'typed-immutable-record';
import { IStatusMessagesRecord } from '../helpers'
// ---- Installtions ----
export interface IInstallations {
  pageMessages: IStatusMessagesRecord;
}

export interface IInstallationsRecord extends
  TypedRecord<IInstallationsRecord>, IInstallations { };
