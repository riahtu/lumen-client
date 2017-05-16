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

  // add element to specified axis
  //
  public plotElement(element, axis: string = 'either') {
    this.elementService.assignColor(element);
    this.ngRedux.dispatch({
      type: ExplorerActions.PLOT_ELEMENT,
      payload: element
    })
  }

  // remove element from plot
  //
  public hideElement(element) {
    this.elementService.removeColor(element);
    this.ngRedux.dispatch({
      type: ExplorerActions.HIDE_ELEMENT,
      payload: element
    })
  }

  // remove all elements from the plot
  public hideAllElements(){
    let elementRecords = this.ngRedux.getState().data.dbElements;
    Object.keys(elementRecords)
      .map(id => {
        this.hideElement(elementRecords[id]);
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

  //PUBLIC: 
  buildDataset(
    elements: IDbElement[], 
    data: IDataSet, 
    axis: number) {
    return elements.map(element => {
      if (data[element.id] === undefined || data[element.id] == null)
        return null;
      //use custom display_name if present
      let label = element.name;
      if (element.display_name != "")
        label = element.display_name;

      let baseConfig = {
        label: label,
        yaxis: axis,
        //bars: { show: false, barWidth: 2 },
        //points: { show: false },
        lines: {show: false},
        color: element.color,
        data: data[element.id].data
      }
      switch (data[element.id].type) {
        case 'raw':
          switch (element.display_type) {
            case 'continuous':
              return Object.assign({}, baseConfig,
                {
                  lines: { show: true },
                });
            case 'discrete':
              return Object.assign({}, baseConfig,
                {
                  points: { show: true, radius: 2},
                });
            case 'event':
              return Object.assign({}, baseConfig,
                {
                  bars: { show: true, barWidth: 2 },
                });
          }
        case 'decimated':
          switch (element.display_type) {
            case 'continuous':
              return Object.assign({}, baseConfig,
                {
                  fillArea: [{ opacity: 0.2, representation: "asymmetric" }],
                  lines: {show: true}
                });
            case 'discrete':
              return Object.assign({}, baseConfig,
                {
                  fillArea: [{ opacity: 0.2, representation: "asymmetric" }],
                  points: {show: true, radius: 1}
                });
          }
        case 'interval':
          return Object.assign({}, baseConfig,
            {
              yaxis: baseConfig.yaxis + 2,
              lines: {
                lineWidth: 5,
              },
              points: {
                show: true
              }
            })
        default:
          console.log("unknown data type: ", data[element.id].type)
      }
      return
    }).filter(data => data != null)
  }

  //PRIVATE
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