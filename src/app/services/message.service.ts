import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgRedux } from 'ng2-redux';

import {
  IAppState,
  IStatusMessages
} from '../store';
import {
  PageActions
} from '../store/';

@Injectable()
export class MessageService {

  constructor(
    private ngRedux: NgRedux<IAppState>,
  ) { }

  public setMessages(messages: IStatusMessages): void {
    this.ngRedux.dispatch({
      type: PageActions.SET_MESSAGES,
      payload: messages
    });
  }
  public setError(error: string): void{
    this.setErrors([error]);
  }
  public setErrors(errors: string[]): void{
    this.setMessages({
      notices: [],
      warnings: [],
      errors: errors
    })
  }
  public setWarning(warning: string): void{
    this.setWarnings([warning]);
  }
  public setWarnings(warnings: string[]): void{
    this.setMessages({
      notices: [],
      warnings: warnings,
      errors: []
    })
  }
  public setNotice(notice: string): void{
    this.setNotices([notice]);
  }
  public setNotices(notices: string[]): void{
    this.setMessages({
      notices: notices,
      warnings: [],
      errors: []
    })
  }
  public clearMessages(): void {
    this.ngRedux.dispatch({
      type: PageActions.CLEAR_MESSAGES,
      payload: null
    });
  }
}