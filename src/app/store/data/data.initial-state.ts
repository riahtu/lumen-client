
import * as data from './data.types';
import { makeTypedFactory } from 'typed-immutable-record';

// ---- Nilm ----
export const NilmFactory = makeTypedFactory<data.INilm, data.INilmRecord>({
  id: null,
  name: '',
  description: '',
  db: null
});

// ---- Db ----
export const DbFactory = makeTypedFactory<data.IDb, data.IDbRecord>({
  id: null,
  url: '',
  contents: null
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
    shallow: true
  });


// ---- DbStream ----
export const DbStreamFactory =
  makeTypedFactory<data.IDbStream, data.IDbStreamRecord>({
    id: null,
    name: '',
    description: '',
    path: '',
    start_time: 0,
    end_time: 0,
    total_rows: 0,
    total_time: 0,
    data_type: '',
    name_abbrev: '',
    delete_locked: true,
    hidden: false,
    elements: null
  });

// ---- DbElements ----
export const DbElementFactory =
  makeTypedFactory<data.IDbElement, data.IDbElementRecord>({
    id: null,
    name: '',
    units: '',
    column: null,
    default_max: null,
    default_min: null,
    scale_factor: 1.0,
    offset: 0.0,
    plottable: true,
    discrete: false
  });
