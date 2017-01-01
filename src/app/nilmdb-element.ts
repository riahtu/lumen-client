export class NilmdbElement {
  constructor(
    public id: number,
    public name: string,
    public units: number,
    public column: number,
    public default_max: number,
    public default_min: number,
    public scale_factor: number,
    public offset: number,
    public plottable: boolean,
    public discrete: boolean
  ) { }
}
