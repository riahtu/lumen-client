import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as schema from '../../api';
import{ MessageService } from '../message.service';
import { parseAPIErrors } from './helpers';
import { IAppState } from '../../app.store';
import {
  IDbElement,
} from '../../store/data';

@Injectable()
export class DataService {



  constructor(
    private tokenService: Angular2TokenService,
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService
  ) { }

  public loadData(
    startTime: number, 
    endTime: number, 
    elements: IDbElement[]): Observable<any>{
      let params: URLSearchParams = new URLSearchParams();
      params.set('elements', 
        JSON.stringify(elements.map(e => e.id)));
      if(startTime != null)
        params.set('start_time', startTime.toString());
      if(endTime != null)
        params.set('end_time', endTime.toString());
    
      return this.tokenService
        .get(`db_elements/data.json`, 
          {search: params})
        .map(resp => resp.json())
        .map(json => normalize(json.data, schema.datas))
        .map(normalized => normalized.entities.data)
    }
}

