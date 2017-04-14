import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Angular2TokenService } from 'angular2-token';
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
    private tokenService: Angular2TokenService,
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private messageService: MessageService
  ) { }

  public login(email: string, password: string): void {
    this.tokenService.signIn({ "email": email, "password": password })
      .map(resp => resp.json())
      .subscribe(
      json => {
        this.setUser(json.data)
        this.router.navigate(['/home']);
        this.messageService.clearMessages();
      },
      error => this.messageService.setErrors(parseDeviseErrors(error)));
  }


  public logout(email: string, password: string): void {
    this.tokenService.signOut()
      .subscribe(
      res => this.messageService.setNotice("logged out"),
      error => this.messageService.setError("error logging out"));
  }

  public updateAccount(accountParams: any) {
    this.tokenService.put('/auth.json', accountParams)
      .map(resp => resp.json())
      .subscribe(
      json => {
        this.setUser(json.data);
        this.messageService.setNotice("account updated");
      },
      error => this.messageService.setErrors(parseDeviseErrors(error)));
  }

  public resetPassword(email: string): void {
    this.tokenService.resetPassword({ email: email })
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
    this.tokenService.updatePassword(
      {
        password: password,
        passwordConfirmation: passwordConfirmation,
        resetPasswordToken: token,
        passwordCurrent: null
      })
      .subscribe(
      res => this.messageService.setNotice(res.toString()),
      error => this.messageService.setError(error));
  };

  public validateToken(): void {
    this.tokenService.validateToken()
      .map(resp => resp.json())
      .subscribe(
      json => this.setUser(json.data),
      error => this.messageService.setError("Log in before continuing"));
  }

  // ----------private helper functions----------

  private setUser(json) {
    this.ngRedux.dispatch({
      type: UserActions.SET_CURRENT,
      payload: json
    });
  }
}