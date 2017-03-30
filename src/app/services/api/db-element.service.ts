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

