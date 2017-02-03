
import * as data from './data.types';
import { makeTypedFactory } from 'typed-immutable-record';

// ---- Nilm ----
export const NilmFactory = makeTypedFactory<data.INilm, data.INilmRecord>({
  id: null,
  name: '',
  description: '',
  url: '',
  db: null
});

// ---- Db ----
export const DbFactory = makeTypedFactory<data.IDb, data.IDbRecord>({
  id: null,
  url: '',
  version: 'unknown',
  size_total: 0,
  size_db: 0,
  size_other: 0,
  max_points_per_plot: 0,
  available: true,
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
    shallow: true,
    start_time: null,
    end_time: null,
    size_on_disk: 0
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
    delete_locked: true,
    hidden: false,
    elements: null,
    size_on_disk: 0
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
