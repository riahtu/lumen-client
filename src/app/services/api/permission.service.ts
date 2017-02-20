import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Angular2TokenService } from 'angular2-token';
import { NgRedux } from 'ng2-redux';
import { Http, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as schema from '../../api';

import { IAppState } from '../../store';
import {
  PermissionActions
} from '../../store/data';
import {
  MessageService
} from '../message.service';
import {
  parseAPIErrors
} from './helpers';

@Injectable()
export class PermissionService {


  constructor(
    //private http: Http,
    private tokenService: Angular2TokenService,
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService
  ) { }

  public loadPermissions(nilmId: number): void {
    let params: URLSearchParams = new URLSearchParams();
    params.set('nilm_id',nilmId.toString());
    this.tokenService
      .get('permissions.json', {search: params})
      .map(resp => resp.json())
      .subscribe(
      json => {
        console.log()
        this.ngRedux.dispatch({
          type: PermissionActions.RECEIVE,
          payload: normalize(json, schema.permissions).entities.permissions
        });
      },
      error => this.messageService.setErrors(parseAPIErrors(error))
      );
  }
}
