import { TypedRecord } from 'typed-immutable-record';

// ---- Account ----
export interface IAccount {
 
  //flags to indicate whether data has been retrieved
  nilms_loaded?: boolean;
  data_views_loaded?: boolean;
  user_groups_loaded?: boolean;
}

export interface IAccountRecord extends
  TypedRecord<IAccountRecord>, IAccount { };