export interface INilmState {
  nilmsById: {};
}

export interface INilm {
  id: number;
  name: string;
  description: string;
  db: INilmdb;
}

export interface INilmdb {
  id: number;
  url: string;
  contents: INilmdbFolder;
}

export interface INilmdbFolder {
  id: number;
  name: string;
  description: string;
  path: string;
  hidden: boolean;
  subfolders: INilmdbFolder[];
  streams: INilmdbStream[];
}

export interface INilmdbStream {
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
  elements: INilmdbElement[];
}

export interface INilmdbElement {
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
