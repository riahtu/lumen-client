import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import {
  ExplorerActions,
  IRange
} from './store';

import { IAppState } from '../app.store';
import { MessageService } from '../services/';
import { IDbElement } from '../store/data';
import { 
  DataService,
  DbElementService
 } from '../services';

@Injectable()
export class ExplorerService {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private messageService: MessageService,
    private dataService: DataService,
    private elementService: DbElementService
  ) { }

  public plotElement(element, axis: string = 'either') {
    this.elementService.assignColor(element);
    this.ngRedux.dispatch({
      type: ExplorerActions.PLOT_ELEMENT,
      payload: element
    })
  }
  public hideElement(element) {
    this.elementService.removeColor(element);
    this.ngRedux.dispatch({
      type: ExplorerActions.HIDE_ELEMENT,
      payload: element
    })
  }
  public loadPlotData(
    elements: IDbElement[],
    timeRange: IRange
  ) {
    let plotData = this.ngRedux.getState().ui.explorer.plot_data;
    let neededElements = elements
      .filter(e => { let data = plotData[e.id];
        if (data === undefined || data == null) {
          return true;
        } else if (data.start_time != timeRange.min || data.end_time != timeRange.max) {
          return true;
        } else {
          return false;
        }
      })
    if (neededElements.length == 0) {
      return //nothing to do, data is already loaded
    }
    this.dataService.loadData(timeRange.min, timeRange.max, neededElements)
      .subscribe(data => {
        this.ngRedux.dispatch({
          type: ExplorerActions.ADD_PLOT_DATA,
          payload: data
        })
      })
  }

}