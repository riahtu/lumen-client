import { TypedRecord } from 'typed-immutable-record';

// ---- DbAdmin ----
export interface IDbAdmin {
  selectedType: string;
  selectedId: number;
  dbId: number;
}
export interface IDbAdminRecord extends
  TypedRecord<IDbAdminRecord>, IDbAdmin { };
