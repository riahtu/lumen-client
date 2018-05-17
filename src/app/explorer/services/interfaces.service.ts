import { Injectable} from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as _ from 'lodash';
import {
  InterfaceActions,
} from '../store';
import { IAppState } from '../../app.store';
import * as schema from '../../api';
import { normalize } from 'normalizr';
import { Angular2TokenService } from 'angular2-token';
import { JouleModuleActions } from '../../store/data';


@Injectable()
export class InterfacesService {


  constructor(
    private tokenService: Angular2TokenService,
    private ngRedux: NgRedux<IAppState>,
  ) {}

  //display a joule module interface
  //
  public add(id: number) {
    //get the joule module with the 
    //authorization URL
    this.tokenService
      .get(`joule_modules/${id}.json`)
      .map(resp => resp.json())
      .subscribe(
      json => {
        let entities = normalize(json, schema.jouleModule).entities;
        console.log(entities);
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
