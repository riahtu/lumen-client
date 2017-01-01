import { Nilmdb } from './nilmdb';

export class Nilm {
  private nilmdb: Nilmdb;

  static fromJSON(json: Nilm): Nilm {
    let nilm =
      Object.create(Nilm.prototype);
    return Object.assign(nilm, json);
  }

  constructor(
    public id: number,
    public name: string,
    public description: string
  ) {
    this.nilmdb = null;
  }
}
