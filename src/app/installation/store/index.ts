import {IInstallation } from './types';
export * from './types';
export * from './actions';

export interface IState extends IInstallation {}
export {reducer} from './reducer';
