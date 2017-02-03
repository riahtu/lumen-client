
import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import {
  IAppState,
  InstallationsActions
} from '../../store';
import {
  IStatusMessages,
} from '../../store';
import {
  NilmService,
  parseErrors
} from '../api';

@Injectable()
export class InstallationsService {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private nilmService: NilmService,
  ) { }

// ---loadNilms: request nilms-----
  public loadNilms() {
    this.nilmService.loadNilms()
      .subscribe(success => { }, error => {
        this.ngRedux.dispatch({
          type: InstallationsActions.SET_PAGE_MESSAGES,
          payload: parseErrors(error)
        })
      })
  }
}