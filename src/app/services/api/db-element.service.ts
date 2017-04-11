import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs';
import { IAppState } from '../../app.store';
import{ ColorService } from './color.service';

import {
  DbElementActions,
  IDbElement,
} from '../../store/data';

@Injectable()
export class DbElementService {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private colorService: ColorService
  ) { }

  public setDisplayName(element: IDbElement, name: string){
     this.ngRedux.dispatch({
      type: DbElementActions.SET_DISPLAY_NAME,
      payload: {
        id: element.id,
        name: name
      }
    })  
  }
  public setColor(element: IDbElement, color: string){
    if(element.color == color)
      return; //nothing to do
    if(element.color!=null){
      this.colorService.returnColor(element.color);
    }
    this.ngRedux.dispatch({
      type: DbElementActions.SET_COLOR,
      payload: {
        id: element.id,
        color: color
      }
    })  
  }
  
  public assignColor(element: IDbElement){
    if(element.color!=null)
      return; //already has a color so nothing to do
    this.ngRedux.dispatch({
      type: DbElementActions.SET_COLOR,
      payload: {
        id: element.id,
        color: this.colorService.requestColor()
      }
    })    
  }

  public removeColor(element: IDbElement){
    if(element.color==null)
      return; //no color associated with this element
    this.colorService.returnColor(element.color);
    this.ngRedux.dispatch({
      type: DbElementActions.SET_COLOR,
      payload: {
        id: element.id,
        color: null
      }
    })
  }
}

