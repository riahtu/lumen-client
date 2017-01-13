
import { IPayloadAction } from '../../actions';
import { NilmActions } from './nilm.actions';
import { NilmFactory } from './nilm.initial-state';
import { recordify } from '../helpers';
import { INilmRecords } from './nilm.types';

export function nilmReducer(
  state: INilmRecords = {},
  action: IPayloadAction): INilmRecords {
  switch (action.type) {
    case NilmActions.RECEIVE:
      return recordify(action.payload, NilmFactory);
    default:
      return state;
  }
}
