
import * as data from './types';
import { makeTypedFactory } from 'typed-immutable-record';

// ---- Nilm ----
export const NilmFactory = makeTypedFactory<data.INilm, data.INilmRecord>({
  id: null,
  name: '',
  description: '',
  url: '',
  role: '',
  available: false,
  jouleModules: [],
  refreshing: false,
  root_folder: null,
  max_points_per_plot: 0
});

// ---- JouleModule ----
export const JouleModuleFactory = makeTypedFactory<data.IJouleModule, data.IJouleModuleRecord>({
  id: null,
  url: '',
  name: '',
  description: '',
  exec_cmd: '',
  status: 'unknown',
  pid: null,
  web_interface: false,
  joule_id: null,
  nilm_id: null
});

// ---- DbFolder ----
export const DbFolderFactory =
  makeTypedFactory<data.IDbFolder, data.IDbFolderRecord>({
    id: null,
    name: '',
    description: '',
    path: '',
    hidden: false,
    subfolders: [],
    streams: [],
    shallow: true,
    start_time: null,
    end_time: null,
    size_on_disk: 0,
    locked: false
  });

// ---- DbStream ----
export const DbStreamFactory =
  makeTypedFactory<data.IDbStream, data.IDbStreamRecord>({
    id: null,
    name: '',
    description: '',
    path: '',
    start_time: null,
    end_time: null,
    total_rows: 0,
    total_time: 0,
    data_type: '',
    name_abbrev: '',
    locked: false,
    hidden: false,
    elements: null,
    size_on_disk: 0,
    nilm_id: null
  });

// ---- DbElement ----
export const DbElementFactory =
  makeTypedFactory<data.IDbElement, data.IDbElementRecord>({
    id: null,
    db_stream_id: null,
    name: '',
    units: 'none',
    column: null,
    default_max: null,
    default_min: null,
    scale_factor: 1.0,
    offset: 0.0,
    plottable: true,
    display_type: '',
    path: '',
    color: null,
    display_name: ''
  });

// --- Data ----
export const DataFactory = 
  makeTypedFactory<data.IData, data.IDataRecord>({
  start_time: null,
  end_time: null,
  data: [],
  type: 'unknown',
  valid: true
});

// ---- User ----
export const UserFactory =
  makeTypedFactory<data.IUser, data.IUserRecord>({
    id: null,
    first_name: null,
    last_name: null,
    email: null
  });

export const UserStoreFactory = 
  makeTypedFactory<data.IUserStore, data.IUserStoreRecord>({
    current: null,
    entities: {}
});

// ---- UserGroup ----
export const UserGroupFactory =
  makeTypedFactory<data.IUserGroup, data.IUserGroupRecord>({
    id: null,
    name: '',
    description: '',
    members: []
  });
export const UserGroupStoreFactory = 
  makeTypedFactory<data.IUserGroupStore, data.IUserGroupStoreRecord>({
    owner: [],
    member: [],
    entities: {}
});

// ---- Permission ----
export const PermissionFactory =
  makeTypedFactory<data.IPermission, data.IPermissionRecord>({
    id: null,
    target_name: '',
    target_type: 'unknown',
    role: 'invalid',
    nilm_id: null,
    removable: false
  });

// --- DataView ----
export const DataViewFactory = 
  makeTypedFactory<data.IDataView, data.IDataViewRecord>({
    id: null,
    name: '',
    description: '',
    image: '',
    redux: null,
    owner: false,
    live: false,
    private: false,
    home: false
  })
