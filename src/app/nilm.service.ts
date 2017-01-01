import { Injectable } from '@angular/core';
import { Nilmdb } from './nilmdb';
import { Nilm } from './nilm';
import { Observable, BehaviorSubject } from 'rxjs';
import { Http, URLSearchParams } from '@angular/http';


@Injectable()
export class NilmService {

  private _nilms: BehaviorSubject<Nilm[]> =
  new BehaviorSubject<Nilm[]>([]);
  private _nilm: BehaviorSubject<Nilm> =
  new BehaviorSubject<Nilm>(null);


  public nilms: Observable<Nilm[]> = this._nilms.asObservable();

  constructor(
    private http: Http
  ) {

  }

  public loadNilms() {
    this.http
      .get('http://localhost:3000/nilms.json')
      .map(resp => resp.json())
      .map(json => json.map(item => Nilm.fromJSON(item)))
      .subscribe(this._nilms);
  }
  public setNilm(nilm: Nilm) {
    this._nilm.next(nilm);
  }


}
