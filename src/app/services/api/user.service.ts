import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Angular2TokenService } from 'angular2-token';
import { NgRedux } from 'ng2-redux';
import { Http, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as schema from '../../api';

import { IAppState } from '../../app.store';
import {
  UserActions,
} from '../../store/data';
import {
  MessageService
} from '../message.service';
import {
  parseAPIErrors
} from './helpers';

@Injectable()
export class UserService {

  private usersLoaded: boolean;

  constructor(
    //private http: Http,
    private tokenService: Angular2TokenService,
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService
  ) {
    this.usersLoaded = false;
   }

  public loadUsers(): void {
    //only execute request once
    if(this.usersLoaded)
      return;

    this.tokenService
      .get('users.json', {})
      .map(resp => resp.json())
      .map(json => normalize(json,schema.users).entities)
      .subscribe(
      entities => {
        this.ngRedux.dispatch({
          type: UserActions.RECEIVE,
          payload: entities['users']
        });
        this.usersLoaded = true;
      },
      error => this.messageService.setErrors(parseAPIErrors(error))
      );
  }
}
