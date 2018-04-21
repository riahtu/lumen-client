import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Angular2TokenService } from 'angular2-token';
import { NgRedux } from '@angular-redux/store';
import { Http, Headers, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';

import * as schema from '../../api';
import { MessageService } from '../message.service';
import {
  IAppState
} from '../../app.store';
import {
  IJouleModule,
  JouleModuleActions,
  NilmActions,
} from '../../store/data';

@Injectable()
export class JouleModuleService {


  constructor(
    private tokenService: Angular2TokenService,
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService
  ) { }


  public loadJouleModules(nilmId: number): void {
    let o = this.tokenService
      .get(`joule_modules/${nilmId}.json?refresh=1`, {})
      .map(resp => resp.json())
      .map(json => normalize(json.data, schema.jouleModules))

    o.subscribe(
      normalized => {
        this.ngRedux.dispatch({
          type: JouleModuleActions.RECEIVE,
          payload: normalized.entities['jouleModules']
        });
        this.ngRedux.dispatch({
          type: NilmActions.SET_JOULE_MODULES,
          payload: {id: nilmId, module_ids: normalized.result}
        })
      },
      error => this.messageService.setErrorsFromAPICall(error)
    );
  }
  public updateJouleModules(nilmId: number): void {
    console.log("TODO");
  }

}
