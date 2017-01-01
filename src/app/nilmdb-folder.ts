import { NilmdbStream } from './nilmdb-stream';

export class NilmdbFolder {
  constructor(
    public id: number,
    public namespace: string,
    public description: string,
    public path: string,
    public hidden: boolean,
    public subfolders: NilmdbFolder[],
    public streams: NilmdbStream[]
  ) { };
}
