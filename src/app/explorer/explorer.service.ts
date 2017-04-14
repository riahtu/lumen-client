import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import {
  ExplorerActions,
  IRange
} from './store';
import { IAppState } from '../app.store';
import { MessageService } from '../services/';
import {
  IDbElement,
  IDataSet
} from '../store/data';
import {
  DataService,
  DbElementService,
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
  public setElementAxis(element: IDbElement, axis: string) {
    //if the destination axis has elements plotted, this element
    //must have the same units, otherwise return false
    if (axis == "left") {
      if (this.ngRedux.getState().ui.explorer.left_elements.length > 0 &&
        element.units != this.ngRedux.getState().ui.explorer.left_units)
        return false;
    } else if (axis == "right") {
      if (this.ngRedux.getState().ui.explorer.right_elements.length > 0 &&
        element.units != this.ngRedux.getState().ui.explorer.right_units)
        return false;
    } else {
      console.log(`invalid axis ${axis}`)
      return false;
    }
    this.ngRedux.dispatch({
      type: ExplorerActions.SET_ELEMENT_AXIS,
      payload: {
        element: element,
        axis: axis
      }
    })
  }
  public showPlot() {
    if (this.ngRedux.getState().ui.explorer.show_plot == false)
      this.ngRedux.dispatch({
        type: ExplorerActions.SHOW_PLOT
      })
  }
  public hidePlot() {
    if (this.ngRedux.getState().ui.explorer.show_plot)
      this.ngRedux.dispatch({
        type: ExplorerActions.HIDE_PLOT
      })
  }
  public loadPlotData(
    elements: IDbElement[],
    timeRange: IRange
  ) {
    let existingData = this.ngRedux.getState().ui.explorer.plot_data;
    let neededElements = this.findNeededElements(elements, existingData, timeRange);
    if (neededElements.length == 0)
      return; //nothing to do
    this.dataService.loadData(timeRange.min, timeRange.max, neededElements)
      .subscribe(data => {
        this.ngRedux.dispatch({
          type: ExplorerActions.ADD_PLOT_DATA,
          payload: data
        })
      })
  }
  public loadNavData(
    elements: IDbElement[],
    timeRange: IRange
  ) {
    let existingData = this.ngRedux.getState().ui.explorer.nav_data;
    let neededElements = this.findNeededElements(elements, existingData, timeRange);
    if (neededElements.length == 0)
      return; //nothing to do
    this.dataService.loadData(timeRange.min, timeRange.max, neededElements)
      .subscribe(data => {
        this.ngRedux.dispatch({
          type: ExplorerActions.ADD_NAV_DATA,
          payload: data
        })
      })
  }

  public toggleNavZoomLock() {
    this.ngRedux.dispatch({
      type: ExplorerActions.TOGGLE_ZOOM_LOCK
    });
  }
  public disableNavZoomLock() {
    this.ngRedux.dispatch({
      type: ExplorerActions.DISABLE_ZOOM_LOCK
    });
  }
  public toggleDataCursor() {
    this.ngRedux.dispatch({
      type: ExplorerActions.TOGGLE_DATA_CURSOR
    });
  }
  public disableDataCursor() {
    this.ngRedux.dispatch({
      type: ExplorerActions.DISABLE_DATA_CURSOR
    });
  }

  public setPlotTimeRange(range: IRange) {
    this.ngRedux.dispatch({
      type: ExplorerActions.SET_PLOT_TIME_RANGE,
      payload: range
    })
  }
  public setNavRangeToPlotRange() {
    this.ngRedux.dispatch({
      type: ExplorerActions.SET_NAV_RANGE_TO_PLOT_RANGE
    })
  }

  ///------ helpers ------------

  private findNeededElements(
    elements: IDbElement[],
    existingData: IDataSet,
    timeRange: IRange
  ) {
    return elements
      .filter(e => {
        let data = existingData[e.id];
        if (data === undefined || data == null) {
          return true;
        } else if (data.start_time != timeRange.min || data.end_time != timeRange.max) {
          return true;
        } else {
          return false;
        }
      })
  }


}