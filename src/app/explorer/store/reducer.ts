import { IPayloadAction } from '../../store/helpers';
import { ExplorerActions } from './actions';
import { IExplorerRecord } from './types';
import {
  IDbElement,
  IDataSet,
  DataFactory
} from '../../store/data'
import {
  recordify
} from '../../store/helpers';
import {
  INITIAL_STATE
} from './initial-state';
import * as _ from 'lodash';
import { IRange } from './types';

export function reducer(
  state: IExplorerRecord = INITIAL_STATE,
  action: IPayloadAction): IExplorerRecord {
  let element: IDbElement;
  let data: IDataSet;
  switch (action.type) {

    // plot an element, auto select the appropriate axis
    //
    case ExplorerActions.PLOT_ELEMENT:
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
    case ExplorerActions.HIDE_ELEMENT:
      element = action.payload;
      return state
        .set('left_elements', state.left_elements
          .filter(id => id != element.id))
        .set('right_elements', state.right_elements
          .filter(id => id != element.id))

    //change a plotted element's axis
    //
    case ExplorerActions.SET_ELEMENT_AXIS:
      element =action.payload.element;
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
        .set(`${dest}_elements`,_.uniq(_.concat(state[`${dest}_elements`], element.id)))
        .set(`${dest}_units`,element.units)
        .set(`${src}_elements`, state[`${src}_elements`].filter(id => id != element.id))

    //show the plot window
    //
    case ExplorerActions.SHOW_PLOT:
      return state.set('show_plot', true);
    
    //hide the plot window
    //
    case ExplorerActions.HIDE_PLOT:
      return state.set('show_plot', false);

    //add data retrieved from server to the plot dataset
    //
    case ExplorerActions.ADD_PLOT_DATA:
      data = recordify(action.payload, DataFactory);
      //set plot time range if bounds are null
      return state
        .set('plot_data', Object.assign({}, state.plot_data, data))
        .set('plot_time', setTimeRange(state.plot_time, data))

    //add data retrieved from server to the nav dataset
    //
    case ExplorerActions.ADD_NAV_DATA:
      data = recordify(action.payload, DataFactory);
      //set plot time range if bounds are null
      return state
        .set('nav_data', Object.assign({}, state.nav_data, data))
        .set('nav_time', setTimeRange(state.nav_time, data))

    //set plot time range
    //
    case ExplorerActions.SET_PLOT_TIME_RANGE:
      return state
        .set('plot_time', action.payload);

    //set nav range to the plot range
    //
    case ExplorerActions.SET_NAV_RANGE_TO_PLOT_RANGE:
      return state
        .set('nav_time', state.plot_time);

    //toggle whether the nav zoom window is locked
    //
    case ExplorerActions.TOGGLE_ZOOM_LOCK:
      return state
        .set('nav_zoom_lock', !state.nav_zoom_lock)

    //disable the nav zoom window lock
    //
    case ExplorerActions.DISABLE_ZOOM_LOCK:
      return state
        .set('nav_zoom_lock', false)

    //toggle whether the nav zoom window is locked
    //
    case ExplorerActions.TOGGLE_DATA_CURSOR:
      return state
        .set('data_cursor', !state.data_cursor)

    //disable the nav zoom window lock
    //
    case ExplorerActions.DISABLE_DATA_CURSOR:
      return state
        .set('data_cursor', false)

    default:
      return state;
      }

  function setTimeRange(range: IRange, data: IDataSet) {
    let autoRange = { min: range.min, max: range.max }
    if (data == {})
      return range;
    if (range.min == null && data != {}) {
      autoRange.min = Object.keys(data)
        .map(id => data[id].start_time)
        .sort((a, b) => a - b)[0]
    }
    if (range.max == null && data != {}) {
      autoRange.max = Object.keys(data)
        .map(id => data[id].end_time)
        .sort((a, b) => b - a)[0]
    }
    return autoRange;
  }
}