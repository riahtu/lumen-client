import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NgRedux } from '@angular-redux/store';
import { map } from 'rxjs/operators'
import * as _ from 'lodash';
import {
  InterfaceActions,
} from '../store';
import { IAppState } from '../../app.store';
import * as schema from '../../api';
import { normalize } from 'normalizr';
import { JouleModuleActions } from '../../store/data';


@Injectable()
export class InterfacesService {


  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<IAppState>,
  ) {}

  //display a joule module interface
  //
  public add(id: number) {
    //get the joule module with the 
    //authorization URL
    this.http
      .get(`joule_modules/${id}.json`)
      .subscribe(
      json => {
        let entities = normalize(json, schema.jouleModule).entities;
        this.ngRedux.dispatch({
          type: JouleModuleActions.RECEIVE,
          payload: entities.jouleModules
        })
        this.ngRedux.dispatch({
          type: InterfaceActions.ADD,
          payload: +id
        })
    });
    
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
