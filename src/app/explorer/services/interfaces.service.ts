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
import { DataAppActions } from '../../store/data';


@Injectable()
export class InterfacesService {


  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<IAppState>,
  ) {}

  //display data app in a tab
  //
  public add_internal(id: number) {
    //if the id is already displayed just select it
    //otherwise display it and request the index page
    let state = this.ngRedux.getState()
    let displayed = state.ui.explorer.interfaces.displayed;
    if (displayed.indexOf(id) == -1){
      this.http
      .get(`app/${id}.json`)
      .subscribe(
      json => {
        let entities = normalize(json, schema.dataApp).entities;
        this.ngRedux.dispatch({
          type: DataAppActions.RECEIVE,
          payload: entities.dataApps
        })
        this.ngRedux.dispatch({
          type: InterfaceActions.ADD,
          payload: +id
        })
    })}
    else {
      this.ngRedux.dispatch({
        type: InterfaceActions.ADD,
        payload: +id
      })
    }
  }

  //open data app in new window
  //
  public add_external(id: number) {
    //if the id is already displayed just select it
    //otherwise display it and request the index page
    
    this.http
    .get(`app/${id}.json`)
    .subscribe(
    json => {
      let entities = normalize(json, schema.dataApp).entities;
      this.ngRedux.dispatch({
        type: DataAppActions.RECEIVE,
        payload: entities.dataApps
      })
      let state = this.ngRedux.getState()
      window.open(state.data.dataApps[id].url, '_blank')
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
