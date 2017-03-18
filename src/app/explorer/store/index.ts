import {IExplorer } from './types';
export * from './types';
export * from './actions';

export interface IState extends IExplorer {}
export {reducer} from './reducer';