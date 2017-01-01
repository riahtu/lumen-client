import { NilmdbFolder } from './nilmdb-folder';

export class Nilmdb {


  static fromJSON(json: Nilmdb): Nilmdb {
    let nilmdb =
      Object.create(Nilmdb.prototype);
    return Object.assign(nilmdb, json);
  }

  constructor(
    public id: number,
    public url: string,
    public contents: NilmdbFolder,

  ) { };


}
