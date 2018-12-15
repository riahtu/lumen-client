import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { share } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import * as schema from '../../api';
import { MessageService } from '../message.service';
import { parseDeviseErrors } from './helpers';
import { IAppState } from '../../app.store'
import {
  UserActions
} from '../../store/data';

@Injectable()
export class SessionService {


  constructor(
    //private http: Http,
    private http: HttpClient,
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private messageService: MessageService,
  ) { }


  public login(email: string, password: string): Observable<any> {
    let o = this.http.post<schema.IApiResponse>('auth/sign_in',
    { "email": email, "password": password }).pipe(share())

    o.subscribe(
      json => {
        this.setUser(json.data)
        this.router.navigate(['/explorer']);
        this.messageService.clearMessages();
      },
      error => this.messageService.setErrors(parseDeviseErrors(error))
    );
    return o; //for other subscribers
  }


  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
    this.messageService.setNotice('You are logged out');
  }

  public updateAccount(accountParams: any) {
    this.http.put<schema.IApiResponse>('auth.json', accountParams)
      .subscribe(
      json => {
        this.setUser(json.data);
        this.messageService.setNotice("account updated");
      },
      resp => {
        this.messageService.setErrors(parseDeviseErrors(resp))
      })
  }

  public resetPassword(email: string): void {
    this.http.post('auth/password',{ 
      email: email,
      redirect_url: `${environment.appUrl}/session/reset_password` })
      .subscribe(
      _ => this.messageService.setNotice("sent e-mail with password reset"),
      _ => this.messageService.setError("error sending password reset")
      );
  }

  public updatePassword(
    password: string,
    passwordConfirmation: string
  ): void {
    this.http.put('auth/password',
      {
        password: password,
        password_confirmation: passwordConfirmation
      })
      .subscribe(
      _ => this.router.navigate(['/explorer']),
      resp => this.messageService.setErrors(parseDeviseErrors(resp)));
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