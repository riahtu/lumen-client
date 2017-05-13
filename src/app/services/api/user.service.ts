import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Angular2TokenService } from 'angular2-token';
import { NgRedux } from '@angular-redux/store';
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
    private messageService: MessageService,
    private router: Router
  ) {
    this.usersLoaded = false;
  }

  public loadUsers(): void {
    //only execute request once
    if (this.usersLoaded)
      return;

    this.tokenService
      .get('users.json', {})
      .map(resp => resp.json())
      .map(json => normalize(json, schema.users).entities)
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

  public acceptInvitation(userParams: any, token: string): void {
    userParams['invitation_token'] = token;
    this.tokenService
      .put(`auth/invitation.json`, userParams)
      .map(resp => resp.json())
      .subscribe(
      json => {
        this.tokenService.signOut();
        this.router.navigate(['/']);
        this.messageService.setNotice('Welcome to Wattsworth, please log in');
      },
      error => this.messageService.setErrors(parseAPIErrors(error))
      );
  }
}
