
import * as plot from './plot';
import * as measurement from './measurement';
import {combineReducers } from 'redux';
export {IRange} from './helpers';
export {PlotActions} from './plot/actions';
export {MeasurementActions} from './measurement/actions';
//   TOP LEVEL: Measurement, Plot
export interface IState {
  plot?: plot.IState,
  measurement?: measurement.IState
}
export const reducer = combineReducers<IState>({
  plot: plot.reducer,
  measurement: measurement.reducer
})