import {IAccount } from './types';
export * from './types';
export * from './actions';

export interface IState extends IAccount {}
export {reducer} from './reducer';