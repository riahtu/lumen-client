import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as _ from 'lodash';
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
  public showDateSelector(){
    this.ngRedux.dispatch({
      type: ExplorerActions.SHOW_DATE_SELECTOR
    })
  }
  public hideDateSelector(){
    this.ngRedux.dispatch({
      type: ExplorerActions.HIDE_DATE_SELECTOR
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
    this.ngRedux.dispatch({
      type: ExplorerActions.ADDING_PLOT_DATA
    });
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
    this.ngRedux.dispatch({
      type: ExplorerActions.ADDING_NAV_DATA
    });  
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
  public autoScaleAxis(axis: string) {
    this.ngRedux.dispatch({
      type: ExplorerActions.AUTO_SCALE_AXIS,
      payload: axis
    })
  }

  public autoScaleTime() {
    //figure out the bounds of the displayed elements
    //set the xaxis range to the min/max time limits
    let state = this.ngRedux.getState();
    let bounds = _(state.ui.explorer.left_elements)
      .concat(state.ui.explorer.right_elements)
      .map(id => state.data.dbElements[id])
      .map(elem => state.data.dbStreams[elem.db_stream_id])
      .uniq()
      .map(stream => {
        return {
          //stream timestamps are in us, we want ms
          min: Math.round(stream.start_time/1e3),
          max: Math.round(stream.end_time/1e3)
        }
      })
      .reduce((bounds, range) => {
        bounds.min = Math.min(bounds.min, range.min);
        bounds.max = Math.max(bounds.max, range.max);
        return bounds;
      }, {
        min: Number.POSITIVE_INFINITY,
        max: Number.NEGATIVE_INFINITY
      });
      this.ngRedux.dispatch({
        type: ExplorerActions.SET_PLOT_TIME_RANGE,
        payload: bounds
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