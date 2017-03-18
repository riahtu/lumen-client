import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { ExplorerActions } from './store';

import { IAppState } from '../app.store';
import { 
  MessageService 
} from '../services/';

@Injectable()
export class ExplorerService {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService,
  ) { }

  public plotElement(element, axis:string='either'){
    this.ngRedux.dispatch({
      type: ExplorerActions.PLOT_ELEMENT,
      payload: element
    })
  }
  public hideElement(element){
    this.ngRedux.dispatch({
      type: ExplorerActions.HIDE_ELEMENT,
      payload: element
    })
  }

}