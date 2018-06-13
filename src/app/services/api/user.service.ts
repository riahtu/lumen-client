import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';
import { Http, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import * as schema from '../../api';
import {map} from 'rxjs/operators';
import { IAppState } from '../../app.store';
import {
  UserActions,
} from '../../store/data';
import {
  MessageService
} from '../message.service';


@Injectable()
export class UserService {

  private usersLoaded: boolean;

  constructor(
    //private http: Http,
    private http: HttpClient,
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

    this.http
      .get('users.json', {}).pipe(
        map(json => normalize(json, schema.users).entities))
      .subscribe(
      entities => {
        this.ngRedux.dispatch({
          type: UserActions.RECEIVE,
          payload: entities['users']
        });
        this.usersLoaded = true;
      },
      error => this.messageService.setErrorsFromAPICall(error)
      );
  }

  public acceptInvitation(userParams: any, token: string): void {
    userParams['invitation_token'] = token;
    this.http
      .put(`auth/invitation.json`, userParams)
      .subscribe(
      json => {
        localStorage.clear();
        this.router.navigate(['/']);
        this.messageService.setNotice('Welcome to Wattsworth, please log in');
      },
      error => this.messageService.setErrorsFromAPICall(error)
      );
  }
}
