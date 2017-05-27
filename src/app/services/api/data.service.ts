import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as schema from '../../api';
import { MessageService } from '../message.service';
import { DataViewService } from './data-view.service';
import { parseAPIErrors } from './helpers';
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
    elements: IDbElement[],
    includeView = false): Observable<any> {

    let params = {
      elements: JSON.stringify(elements.map(e => e.id)),
      start_time: startTime != null ? (startTime * 1e3).toString() : null,
      end_time: endTime != null ? (endTime * 1e3).toString() : null,
    }

    if (includeView) {
      let viewState = this.dataViewService.getDataViewState(false).redux;
      //parameter: current view redux json
      params['redux_json'] = JSON.stringify(viewState);
    }

    //use POST when sending a new redux view state with the request   
    return this.tokenService.post('db_elements/data.json', params)
      .map(resp => resp.json())
      .map(json => normalize(json.data, schema.datas))
      .map(normalized => normalized.entities.data)
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

