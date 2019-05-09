import { TypedRecord } from 'typed-immutable-record';
import * as plot from '../../explorer/store/plot';

// ---- Nilm ----
export interface INilm {
  id: number;
  name: string;
  description: string;
  available: boolean;
  url: string;
  role: string;
  refreshing: boolean;
  max_points_per_plot: number;
  root_folder: number; //id of database root
  jouleModules: Array<number>;
}
export interface INilmRecord extends
  TypedRecord<INilmRecord>, INilm { };
export interface INilmRecords {
  [index: string]: INilmRecord;
}

// ---- JouleModule ----
export interface IJouleModule{
  id: number;
  name: string;
  url: string;
  description: string;
  web_interface: boolean;
  exec_cmd: string;
  status: string;
  pid: string;
  joule_id: string; //id used on the Joule node
  nilm_id: number;  //id of the NILM owner
}
export interface IJouleModuleRecord extends
  TypedRecord<IJouleModuleRecord>, IJouleModule { };
export interface IJouleModuleRecords {
  [index: string]: IJouleModuleRecord;
}

// ---- DbFolder ----
export interface IDbFolder {
  id: number;
  name: string;
  description: string;
  path: string;
  hidden: boolean;
  locked: boolean;
  subfolders: Array<number>;
  streams: Array<number>;
  start_time: number;
  end_time: number;
  size_on_disk: number;
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
  size_on_disk: number;
  total_rows: number;
  total_time: number;
  data_type: string;
  name_abbrev: string;
  locked: boolean;
  hidden: boolean;
  elements: Array<number>;
  nilm_id: number;
}
export interface IDbStreamRecord extends
  TypedRecord<IDbStreamRecord>, IDbStream { };
export interface IDbStreamRecords {
  [index: string]: IDbStreamRecord;
}

// ---- DbElements ----
export interface IDbElement {
  id: number;
  db_stream_id: number;
  name: string;
  units: string;
  column: number;
  default_max: number;
  default_min: number;
  scale_factor: number;
  offset: number;
  plottable: boolean;
  display_type: string;
  path: string; 
  //dynamically managed by the client
  color: string;
  display_name: string;
}
export interface IDbElementRecord extends
  TypedRecord<IDbElementRecord>, IDbElement { };
export interface IDbElementRecords {
  [index: string]: IDbElementRecord;
}

// ---- User ----
export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}
export interface IUserRecord extends
  TypedRecord<IUserRecord>, IUser { };
export interface IUserRecords {
    [index: number]: IUserRecord;
};
export interface IUserStore {
  current: number;
  new_installation_token: string;
  installation_token_available: boolean;
  entities: IUserRecords;
}
export interface IUserStoreRecord extends
  TypedRecord<IUserStoreRecord>, IUserStore { };


// ---- UserGroup ----
export interface IUserGroup {
  id: number;
  name: string;
  description: string;
  members: number[];
}
export interface IUserGroupRecord extends
  TypedRecord<IUserGroupRecord>, IUserGroup { };
export interface IUserGroupRecords {
    [index: number]: IUserGroupRecord;
};
export interface IUserGroupStore {
  owner: number[];
  member: number[];
  entities: IUserGroupRecords;
}
export interface IUserGroupStoreRecord extends
  TypedRecord<IUserGroupStoreRecord>, IUserGroupStore { };


// ---- Permission ----
export interface IPermission {
  id: number;
  target_name: string;
  target_type: string;
  nilm_id: number;
  role: string;
  removable: boolean
}

export interface IPermissionRecord extends
  TypedRecord<IPermissionRecord>, IPermission { };
export interface IPermissionRecords {
  [index: string]: IPermission;
}

// ---- DataSet ----
export interface IData {
  start_time: number;
  end_time: number;
  data: any[]; //raw: [[ts, val],...]
               //decimated: [[ts, ]]
  type: string; //raw, decimated, interval
  valid: boolean;
}

export interface IDataRecord extends
  TypedRecord<IDataRecord>, IData { };

export interface IDataSet {
  [index: string]: IData; //indexed by DbElement ID
}

// ---- DataView ----
export interface IDataView {
  id: number;
  name: string;
  description: string;
  image: string;
  redux: IDataViewRedux;
  owner: boolean;
  live: boolean;
  private: boolean;
  home: boolean;
}
export interface IDataViewRedux{
  ui_explorer: plot.IState,
  data_dbElements: IDbElementRecords
}


export interface IDataViewRecord extends
  TypedRecord<IDataViewRecord>, IDataView { };

export interface IDataViewRecords {
  [index: string]: IDataViewRecord;
}