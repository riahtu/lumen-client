import { Injectable} from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as _ from 'lodash';
import {
  InterfaceActions,
} from '../store';
import { IAppState } from '../../app.store';


@Injectable()
export class InterfacesService {


  constructor(
    private ngRedux: NgRedux<IAppState>,
  ) {}

  //display a joule module interface
  //
  public add(id: number) {
    this.ngRedux.dispatch({
      type: InterfaceActions.ADD,
      payload: +id
    })
  }

  //hide a joule module interface
  //
  public remove(id: number) {
    this.ngRedux.dispatch({
      type: InterfaceActions.REMOVE,
      payload: +id
    })
  }

  //set the displayed interface
  // (null to display data explorer)
  //
  public select(id: number) {
    if(id==null){
      this.ngRedux.dispatch({
        type: InterfaceActions.SELECT,
        payload: null
      })
      return;
    }
    this.ngRedux.dispatch({
      type: InterfaceActions.SELECT,
      payload: +id //this converts a null into 0 :(
    })
  }
}
