import { NilmdbElement } from './nilmdb-element';

export class NilmdbStream {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public path: string,
    public start_time: number,
    public end_time: number,
    public total_rows: number,
    public total_time: number,
    public data_type: string,
    public name_abbrev: string,
    public delete_locked: boolean,
    public hidden: boolean,
    public elements: NilmdbElement[]
  ) { }
}
