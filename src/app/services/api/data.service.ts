import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as schema from '../../api';
import { MessageService } from '../message.service';
import { DataViewService } from './data-view.service';
import { IAppState } from '../../app.store';
import {
  IDbElement,
  IDbStream
} from '../../store/data';

@Injectable()
export class DataService {

  constructor(
    private tokenService: Angular2TokenService,
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService,
    private dataViewService: DataViewService
  ) { }

  public loadData(
    startTime: number, //values in milliseconds!
    endTime: number,
    elements: IDbElement[]
  ): Observable<any> {

    let params = {
      elements: JSON.stringify(elements.map(e => e.id)),
      start_time: startTime != null ? (startTime * 1e3).toString() : null,
      end_time: endTime != null ? (endTime * 1e3).toString() : null,
    }

    //convert params to URL search format
    let urlParams = new URLSearchParams;
    Object.keys(params).map(key => {urlParams.set(key,params[key])})
    let o = this.tokenService.get('db_elements/data.json', {search: urlParams})
      .map(resp => resp.json())
      .map(json => normalize(json.data, schema.datas))
      .map(normalized => normalized.entities.data)
    o.subscribe(_ => {}, 
    error => {
      this.messageService.setErrorsFromAPICall(error)
    });
    return o;
  }

  public downloadStream(
    startTime: number, //values in milliseconds!
    endTime: number,
    stream: IDbStream): Observable<any> {

    return this.tokenService
      .post(`db_streams/${stream.id}/data.csv`,
      {
        start_time: (startTime * 1e3).toString(),
        end_time: (endTime * 1e3).toString()
      })
      .map(data => new Blob([data['_body']], { type: 'text/csv' }))
      .map(blob => window.URL.createObjectURL(blob))

  }

}

