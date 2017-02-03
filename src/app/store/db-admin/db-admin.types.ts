import { TypedRecord } from 'typed-immutable-record';

// ---- DbAdmin ----
export interface IDbAdmin {
  selectedType: string;
  selectedDbFolder: number;
  selectedDbStream: number;
  selectedDb: number;
}

export interface IDbAdminRecord extends
  TypedRecord<IDbAdminRecord>, IDbAdmin { };
