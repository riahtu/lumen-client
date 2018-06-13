import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';
import { Http, URLSearchParams } from '@angular/http';
import { normalize } from 'normalizr';
import { Router } from '@angular/router';

import * as schema from '../../api';
import { MessageService } from '../message.service';
import { parseDeviseErrors } from './helpers';
import { IAppState } from '../../app.store'
import {
  IUser,
  UserActions
} from '../../store/data';

@Injectable()
export class SessionService {


  constructor(
    //private http: Http,
    private http: HttpClient,
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private messageService: MessageService
  ) { }


  public login(email: string, password: string): void {
    this.http.post<schema.IApiResponse>('auth/sign_in',
    { "email": email, "password": password })
      .subscribe(
      json => {
        this.setUser(json.data)
        this.router.navigate(['/explorer']);
        this.messageService.clearMessages();
      },
      error => this.messageService.setErrors(parseDeviseErrors(error)));
  }


  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
    this.messageService.setNotice('You are logged out');
  }

  public updateAccount(accountParams: any) {
    this.http.put<schema.IApiResponse>('/auth.json', accountParams)
      .subscribe(
      json => {
        this.setUser(json.data);
        this.messageService.setNotice("account updated");
      },
      error => this.messageService.setErrors(parseDeviseErrors(error)));
  }

  public resetPassword(email: string): void {
    this.http.post('/auth/reset',{ email: email })
      .subscribe(
      res => this.messageService.setNotice("sent e-mail with password reset"),
      error => this.messageService.setError("error sending password reset")
      );
  }

  public updatePassword(
    password: string,
    passwordConfirmation: string,
    token: string
  ): void {
    this.http.put('/user.json',
      {
        password: password,
        passwordConfirmation: passwordConfirmation,
        resetPasswordToken: token,
        passwordCurrent: null
      })
      .subscribe(
      res => this.router.navigate(['/explorer']),
      error => this.messageService.setError(error));
  };

  public validateToken(): void {
    this.http.get<schema.IApiResponse>('auth/validate_token')
      .subscribe(
      json => this.setUser(json.data),
      error => this.logout())
  }

  // ----------private helper functions----------

  private setUser(json) {
    this.ngRedux.dispatch({
      type: UserActions.SET_CURRENT,
      payload: json
    });
  }
}