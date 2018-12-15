import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as _ from 'lodash';
import {
  AccountActions,
} from './store';
import { IAppState } from '../app.store';
import {
  IDbElement,
  IDataSet
} from '../store/data';



@Injectable()
export class AccountService {

  constructor(
    private ngRedux: NgRedux<IAppState>,
  ) { }

  //set flag to indicate nilms have been loaded
  //
  public setNilmsLoaded(){
    this.ngRedux.dispatch({
      type: AccountActions.SET_NILMS_LOADED
    })
  }
  //set flag to indicate data views have been loaded
  //
  public setDataViewsLoaded(){
    this.ngRedux.dispatch({
      type: AccountActions.SET_DATA_VIEWS_LOADED
    })
  }
  //set flag to indicate user groups have been loaded
  //
  public setUserGroupsLoaded(){
    this.ngRedux.dispatch({
      type: AccountActions.SET_USER_GROUPS_LOADED
    })
  }

  public setLoggingIn(val: boolean){
    this.ngRedux.dispatch({
      type: AccountActions.SET_LOGGING_IN,
      payload: val
    })
  }

}