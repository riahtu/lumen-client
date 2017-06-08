import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { Angular2TokenService } from 'angular2-token';

import { IAppState } from '../app.store';
import {
  UIActions,
  IStatusMessages
} from '../store/ui';
@Injectable()
export class MessageService {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private tokenService: Angular2TokenService
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
    this.setErrors(this.parseAPIErrors(error))
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

  private parseAPIErrors(error): string[] {
    if (error.status == 0) {
      return ['cannot contact server'];
    }
    try {
      let msgs = error.json().messages;
      if (msgs === undefined) {
        throw new TypeError("no message property")
      }
      return msgs.errors
    } catch (e) {
      if (error.status == 401) {
        //user is not authorized, sign them out and return to login page
        this.tokenService.signOut();
        window.location.href ='/session/sign_in';
      }
      return [`server error: ${error.status}`]

    }
  }
}