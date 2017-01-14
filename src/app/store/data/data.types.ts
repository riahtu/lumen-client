import { TypedRecord } from 'typed-immutable-record';


// ---- Nilm ----
export interface INilm {
  id: number;
  name: string;
  description: string;
  db: number;
}
export interface INilmRecord extends
  TypedRecord<INilmRecord>, INilm { };
export interface INilmRecords {
  [index: string]: INilmRecord;
}

// ---- Db ----
export interface IDb {
  id: number;
  url: string;
  contents: number;
}
export interface IDbRecord extends
  TypedRecord<IDbRecord>, IDb { };
export interface IDbRecords {
  [index: string]: IDbRecord;
}

// ---- DbFolder ----
export interface IDbFolder {
  id: number;
  name: string;
  description: string;
  path: string;
  hidden: boolean;
  subfolders: Array<number>;
  streams: Array<number>;
  shallow: boolean; // true if contents have not been retrieved from server
}
export interface IDbFolderRecord extends
  TypedRecord<IDbFolderRecord>, IDbFolder { };
export interface IDbFolderRecords {
  [index: string]: IDbFolderRecord;
}

// ---- DbStream ----
export interface IDbStream {
  id: number;
  name: string;
  description: string;
  path: string;
  start_time: number;
  end_time: number;
  total_rows: number;
  total_time: number;
  data_type: string;
  name_abbrev: string;
  delete_locked: boolean;
  hidden: boolean;
  elements: Array<number>;
}
export interface IDbStreamRecord extends
  TypedRecord<IDbStreamRecord>, IDbStream { };
export interface IDbStreamRecords {
  [index: string]: IDbStreamRecord;
}


export interface IDbElement {
  id: number;
  name: string;
  units: number;
  column: number;
  default_max: number;
  default_min: number;
  scale_factor: number;
  offset: number;
  plottable: boolean;
  discrete: boolean;
}
export interface IDbElementRecord extends
  TypedRecord<IDbElementRecord>, IDbElement { };
