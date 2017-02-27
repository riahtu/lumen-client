import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Angular2TokenService } from 'angular2-token';
import { NgRedux } from 'ng2-redux';
import { Http, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as schema from '../../api';

import { IAppState } from '../../store';
import {
  NilmActions,
  DbActions,
  DbFolderActions,
  DbStreamActions,
  DbElementActions
} from '../../store/data';
import {
  MessageService
} from '../message.service';
import {
  parseAPIErrors
} from './helpers';

@Injectable()
export class NilmService {
  
  private nilmsLoaded: boolean;

  constructor(
    //private http: Http,
    private tokenService: Angular2TokenService,
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService
  ) { 
    this.nilmsLoaded = false;
  }

  public loadNilms(): void {
    if(this.nilmsLoaded) {
      return;
    }

    this.tokenService
      .get('nilms.json', {})
      .map(resp => resp.json())
      .subscribe(
      json => {
        this.nilmsLoaded = true;
        this.ngRedux.dispatch({
          type: NilmActions.RECEIVE_ADMIN_NILMS,
          payload: normalize(json.admin, schema.nilms)
        });
        this.ngRedux.dispatch({
          type: NilmActions.RECEIVE_OWNER_NILMS,
          payload: normalize(json.owner, schema.nilms)
        });
        this.ngRedux.dispatch({
          type: NilmActions.RECEIVE_VIEWER_NILMS,
          payload: normalize(json.viewer, schema.nilms)
        });
      },
      error => this.messageService.setErrors(parseAPIErrors(error))
      );
  }

  public loadNilm(nilmId): void {
    this.tokenService
      .get(`nilms/${nilmId}.json`, {})
      .map(resp => resp.json())
      .subscribe(
      json => {
        this.ngRedux.dispatch({
          type: NilmActions.RECEIVE_NILM,
          payload: normalize(json, schema.nilm)
        });
      },
      error => this.messageService.setErrors(parseAPIErrors(error))
      );
  }
}
