import { TypedRecord } from 'typed-immutable-record';

/*
export interface INilmState {
  nilms: { [id: number]: INilmRecord };
};
  dbs: Array<IDbRecord>;
  dbFolders: Array<IDbFolderRecord>;
  dbStreams: Array<IDbStreamRecord>;
  dbElements: Array<IDbElementRecord>;
}*/


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

export interface IDb {
  id: number;
  url: string;
  contents: number;
}
export interface IDbRecord extends
  TypedRecord<IDbRecord>, IDb { };

export interface IDbFolder {
  id: number;
  name: string;
  description: string;
  path: string;
  hidden: boolean;
  subfolders: Array<number>;
  streams: Array<number>;
}
export interface IDbFolderRecord extends
  TypedRecord<IDbFolderRecord>, IDb { };

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
