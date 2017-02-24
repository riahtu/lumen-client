import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Angular2TokenService } from 'angular2-token';
import { NgRedux } from 'ng2-redux';
import { Http, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as schema from '../../api';

import { IAppState } from '../../store';
import {
  UserGroupActions,
} from '../../store/data';
import {
  MessageService
} from '../message.service';
import {
  parseAPIErrors
} from './helpers';

@Injectable()
export class UserGroupService {

  private groupsLoaded: boolean;

  constructor(
    //private http: Http,
    private tokenService: Angular2TokenService,
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService
  ) { 
    this.groupsLoaded = false;
  }

  public loadUserGroups(): void {
    //only execute request once
    if(this.groupsLoaded){
      return;
    }

    this.tokenService
      .get('user_groups.json', {})
      .map(resp => resp.json())
      .map(json => normalize(json,schema.userGroups).entities)
      .subscribe(
      entities => {
        this.groupsLoaded = true;
        this.ngRedux.dispatch({
          type: UserGroupActions.RECEIVE,
          payload: entities['user_groups']
        });
      },
      error => this.messageService.setErrors(parseAPIErrors(error))
      );
  }
}
