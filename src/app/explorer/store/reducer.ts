import { IPayloadAction } from '../../store/helpers';
import { ExplorerActions } from './actions';
import { IExplorerRecord } from './types';
import { 
  IDbElement,
  IDataSet 
} from '../../store/data'
import {
  INITIAL_STATE
} from './initial-state';
import { IRange } from './types';

export function reducer(
  state: IExplorerRecord = INITIAL_STATE,
  action: IPayloadAction): IExplorerRecord {
  let element:IDbElement;
  switch (action.type) {
    case ExplorerActions.PLOT_ELEMENT:
      element = action.payload;
      //first try to plot element on the left
      if (state.left_elements.length == 0 ||
        state.left_units == element.units) {
        return state
          .set('left_units',element.units)
          .set('left_elements',
            [].concat(state.left_elements, [element.id]));
      }
      //next try to plot element on the right
      if (state.right_elements.length == 0 ||
        state.right_units == element.units) {
        return state
          .set('right_units',element.units)
          .set('right_elements',
            [].concat(state.right_elements, [element.id]));
      }
      //error, cannot plot this element
      console.log('error cannot plot unit:',element.units);
      return state;
    case ExplorerActions.HIDE_ELEMENT:
      element = action.payload;
      return state
        .set('left_elements',state.left_elements
          .filter(id => id!=element.id))
        .set('right_elements',state.right_elements
          .filter(id => id!=element.id))
    case ExplorerActions.ADD_PLOT_DATA:
      let data = action.payload;
      //set plot time range if bounds are null
      return state
        .set('plot_data', Object.assign({}, state.plot_data, data))
        .set('plot_time', setTimeRange(state.plot_time, data))
    default:
      return state;
  }

  function setTimeRange(range: IRange, data: IDataSet){
    let autoRange = {min: range.min, max: range.max}
    if(data == {})
      return range;
    if(range.min == null && data != {}){
      autoRange.min = Object.keys(data)
        .map(id => data[id].start_time)
        .sort((a,b)=> a-b)[0]
    }
    if(range.max == null && data != {}){
      autoRange.max = Object.keys(data)
        .map(id => data[id].end_time)
        .sort((a,b)=> b-a)[0]
    }
    return autoRange;
  }
}