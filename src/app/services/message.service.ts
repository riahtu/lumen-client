import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';

import { IAppState } from '../app.store';
import {
  UIActions,
  IStatusMessages
} from '../store/ui';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class MessageService {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private router: Router
  ) { }

  public setMessages(messages: IStatusMessages): void {
    this.ngRedux.dispatch({
      type: UIActions.SET_MESSAGES,
      payload: messages
    });
  }
  public setError(error: string): void {
    this.setErrors([error]);
  }
  public setErrors(errors: string[]): void {
    this.setMessages({
      notices: [],
      warnings: [],
      errors: errors
    })
  }
  public setErrorsFromAPICall(error): void {
    let errors = this.parseAPIErrors(error)
    if(errors.length > 0)
      this.setErrors(errors)
  }
  public setWarning(warning: string): void {
    this.setWarnings([warning]);
  }
  public setWarnings(warnings: string[]): void {
    this.setMessages({
      notices: [],
      warnings: warnings,
      errors: []
    })
  }
  public setNotice(notice: string): void {
    this.setNotices([notice]);
  }
  public setNotices(notices: string[]): void {
    this.setMessages({
      notices: notices,
      warnings: [],
      errors: []
    })
  }
  public clearMessages(): void {
    this.ngRedux.dispatch({
      type: UIActions.CLEAR_MESSAGES,
      payload: null
    });
  }

  private parseAPIErrors(response: HttpErrorResponse): string[] {
    if (response.status == 0) {
      return ['cannot contact server'];
    }
    if (response.status == 401) {
      //user is not authorized, sign them out and return to login page
      localStorage.clear();
      this.router.navigate(['/session/sign_in']);
      this.setNotice('Log in before continuing');
      return [];
    }
    try {
      let msgs = response.error["messages"];
      if (msgs === undefined) {
        throw new TypeError("no message property")
      }
      return msgs.errors
    } catch (e) {
      
      return [`server error: ${response.status}`]

    }
  }
}