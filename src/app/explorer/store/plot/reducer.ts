import { IPayloadAction } from '../../../store/helpers';
import { PlotActions } from './actions';
import { IStateRecord } from './types';
import {
  IDbElement,
  IDataSet,
  IData,
  IDataRecord,
  DataFactory
} from '../../../store/data'
import {
  recordify
} from '../../../store/helpers';
import {
  PlotFactory,
  INITIAL_STATE
} from './initial-state';
import * as _ from 'lodash';
import {
  IState
} from './types';
import {
  IRange,
  IAxisSettings
} from '../helpers'

export function reducer(
  state: IStateRecord = INITIAL_STATE,
  action: IPayloadAction): IStateRecord {
  let element: IDbElement;
  let data: IDataSet;
  switch (action.type) {
    // plot an element, auto select the appropriate axis
    //
    case PlotActions.PLOT_ELEMENT:
      element = action.payload;
      //first try to plot element on the left
      if (state.left_elements.length == 0 ||
        state.left_units == element.units) {
        return state
          .set('left_units', element.units)
          .set('left_elements',
          [].concat(state.left_elements, [element.id]));
      }
      //next try to plot element on the right
      if (state.right_elements.length == 0 ||
        state.right_units == element.units) {
        return state
          .set('right_units', element.units)
          .set('right_elements',
          [].concat(state.right_elements, [element.id]));
      }
      //error, cannot plot this element
      console.log('error cannot plot unit:', element.units);
      return state;

    //hide a plotted element
    //
    case PlotActions.HIDE_ELEMENT:
      element = action.payload;
      return state
        .set('left_elements', state.left_elements
          .filter(id => id != element.id))
        .set('right_elements', state.right_elements
          .filter(id => id != element.id))

    //hide all elements (clear left_elements and right_elements)
    //
    case PlotActions.HIDE_ALL_ELEMENTS:
      return state.remove('left_elements').remove('right_elements')
      
    //change a plotted element's axis
    //
    case PlotActions.SET_ELEMENT_AXIS:
      element = action.payload.element;
      let targetAxis = action.payload.axis;
      let src, dest;
      if (targetAxis == 'right') {
        src = 'left'; dest = 'right';
      } else if (targetAxis == 'left') {
        src = 'right'; dest = 'left';
      } else {
        console.log(`invalid axis ${action.payload.axis}`)
        return state;
      }
      return state
        .set(`${dest}_elements`, _.uniq(_.concat(state[`${dest}_elements`], element.id)))
        .set(`${dest}_units`, element.units)
        .set(`${src}_elements`, state[`${src}_elements`].filter(id => id != element.id))

    //show the plot window
    //
    case PlotActions.SHOW_PLOT:
      return state.set('show_plot', true);

    //hide the plot window
    //
    case PlotActions.HIDE_PLOT:
      return state.set('show_plot', false);

    //show the plot date selector
    //
    case PlotActions.SHOW_DATE_SELECTOR:
      return state.set('show_date_selector', true);

    //hide the plot date selector
    //
    case PlotActions.HIDE_DATE_SELECTOR:
      return state.set('show_date_selector', false);

    //adding data: indicate a server request has been made
    //
    case PlotActions.ADDING_PLOT_DATA:
      return state.set('adding_plot_data', true);

    //add data retrieved from server to the plot dataset
    //
    case PlotActions.ADD_PLOT_DATA:
      data =
        handleMissingData(
          state.plot_data,
          <IDataSet>action.payload,
          state.plot_time.min,
          state.plot_time.max)

      //set plot time range if bounds are null
      return state
        .set('plot_data', Object.assign({}, state.plot_data, data))
        .set('plot_time', setTimeRange(state.plot_time, data))
        .set('adding_plot_data', false);

    //adding nav data: indicate a server request has been made
    //
    case PlotActions.ADDING_NAV_DATA:
      return state.set('adding_nav_data', true);

    //add data retrieved from server to the nav dataset
    //
    case PlotActions.ADD_NAV_DATA:
      data =
        handleMissingData(
          state.nav_data,
          <IDataSet>action.payload,
          state.nav_time.min,
          state.nav_time.max)
      //set plot time range if bounds are null
      return state
        .set('nav_data', Object.assign({}, state.nav_data, data))
        .set('nav_time', setTimeRange(state.nav_time, data))
        .set('adding_nav_data', false);

    //reset the plot time ranges
    //
    case PlotActions.RESET_TIME_RANGES:
      return state
        .set('plot_time', { min: null, max: null })
        .set('nav_time', { min: null, max: null })

    //set plot time range
    //
    case PlotActions.SET_PLOT_TIME_RANGE:
      return state
        .set('plot_time', action.payload);

    //set nav time range
    //
    case PlotActions.SET_NAV_TIME_RANGE:
      return state
        .set('nav_time', action.payload);

    //set nav range to the plot range
    //
    case PlotActions.SET_NAV_RANGE_TO_PLOT_RANGE:
      return state
        .set('nav_time', state.plot_time);

    //toggle whether the nav zoom window is locked
    //
    case PlotActions.TOGGLE_ZOOM_LOCK:
      return state
        .set('nav_zoom_lock', !state.nav_zoom_lock)

    //disable the nav zoom window lock
    //
    case PlotActions.DISABLE_ZOOM_LOCK:
      return state
        .set('nav_zoom_lock', false)

    //toggle whether the nav zoom window is locked
    //
    case PlotActions.TOGGLE_DATA_CURSOR:
      return state
        .set('data_cursor', !state.data_cursor)

    //disable the nav zoom window lock
    //
    case PlotActions.DISABLE_DATA_CURSOR:
      return state
        .set('data_cursor', false)

    //toggle whether the view is live updating
    //
    case PlotActions.TOGGLE_LIVE_UPDATE:
      return state
        .set('live_update', !state.live_update)

    //disable the live update
    //
    case PlotActions.DISABLE_LIVE_UPDATE:
      return state
        .set('live_update', false)

    //toggle whether the data envelope is plotted
    //
    case PlotActions.TOGGLE_SHOW_DATA_ENVELOPE:
      return state
        .set('show_data_envelope', !state.show_data_envelope)

    //toggle whether public data views are displayed
    //
    case PlotActions.SET_SHOW_PUBLIC_DATA_VIEWS:
      return state
        .set('show_public_data_views', action.payload)

    //set filter text for data view search bar
    //
    case PlotActions.SET_DATA_VIEW_FILTER_TEXT:
      return state
        .set('data_view_filter_text', action.payload)

    //auto scale specified axis to include
    // all available data
    case PlotActions.AUTO_SCALE_AXIS:
      let axis = action.payload;
      switch (axis) {
        case 'left':
          return state.set('plot_y1', { min: null, max: null });
        case 'right':
          return state.set('plot_y2', { min: null, max: null });
        default:
          console.log(`error, invalid axis ${axis}`)
      }
      return state;

    //update left axis settings
    //
    case PlotActions.SET_LEFT_AXIS_SETTINGS:
      return state.set('left_axis_settings', <IAxisSettings>Object.assign({},action.payload));

    //update right axis settings
    //
    case PlotActions.SET_RIGHT_AXIS_SETTINGS:
      return state.set('right_axis_settings', <IAxisSettings>Object.assign({},action.payload));

    //update time axis settings
    //
    case PlotActions.SET_TIME_AXIS_SETTINGS:
      return state.set('time_axis_settings', <IAxisSettings>Object.assign({},action.payload));

    //restore view from a saved redux object
    //
    case PlotActions.RESTORE_VIEW:
      return PlotFactory(
        Object.assign({}, action.payload,
          {  //convert plot and nav data to records
            nav_data: recordify(action.payload.nav_data, DataFactory),
            plot_data: recordify(action.payload.plot_data, DataFactory),
            //override data retrieval view states
            nilms_loaded: state.nilms_loaded,
            data_views_loaded: state.data_views_loaded
          }));
    
    //set flag to indicate nilms are loaded
    //
    case PlotActions.SET_NILMS_LOADED:
      return state
        .set('nilms_loaded',true);

    //set flag to indicate data views are loaded
    //
    case PlotActions.SET_DATA_VIEWS_LOADED:
      return state
        .set('data_views_loaded',true);

    default:
      return state;
  }



  function setTimeRange(range: IRange, data: IDataSet) {
    let autoRange = { min: range.min, max: range.max }
    if (data == {})
      return range;
    if (range.min == null && data != {}) {
      let possibleMinTimes = Object.keys(data)
        .map(id => data[id].start_time)
        .filter(time => time!=null)
        .sort((a, b) => a - b)
      if(possibleMinTimes.length>0) 
        autoRange.min = possibleMinTimes[0]
    }
    if (range.max == null && data != {}) {
      let possibleMaxTimes = Object.keys(data)
        .map(id => data[id].end_time)
        .filter(time => time!=null)
        .sort((a, b) => b - a)
      if(possibleMaxTimes.length>0) 
        autoRange.max = possibleMaxTimes[0]
    }
    return autoRange;
  }

  //fill in missing data by updating existing data with the requested time bounds
  //or creating new entries with no data using the requested time bounds
  function handleMissingData(
    currentData: IDataSet,
    newData: IDataSet,
    startTime: number,
    endTime: number): IDataSet {
    return Object.keys(newData)
      .reduce((acc: IDataSet, id: string): IDataSet => {
        //OK: pass valid data through
        if (newData[id].type != 'error') {
          acc[id] = DataFactory(newData[id]);
          return acc;
        }
        //ERROR: data could not be retrieved! 
        //if valid data exsists, update it with the requested time bounds
        if (currentData[id] !== undefined) {
          acc[id] = (<IDataRecord>currentData[id])
          .set('start_time',startTime)
          .set('end_time',endTime)
          .set('valid',false)
          return acc;
        } else {
          //there is no valid data for this element, create an empty record
          acc[id] = DataFactory({
            start_time: startTime,
            end_time: endTime,
            data: [],
            type: 'raw',
            valid: false
          })
          return acc;
        }
      }, <IDataSet>{});
  }
}