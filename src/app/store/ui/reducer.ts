import { IPayloadAction } from '../helpers';
import { UIActions } from './actions';
import { IUIRecord } from './types';
import {
  INITIAL_STATE,
  StatusMessagesFactory
} from './initial-state';

export function reducer(
  state: IUIRecord = INITIAL_STATE,
  action: IPayloadAction): IUIRecord {
  switch (action.type) {
    case UIActions.SET_MESSAGES:
      return state.merge({
        messages: StatusMessagesFactory(action.payload)
      });
    case UIActions.CLEAR_MESSAGES:
      return state.merge({
        messages: StatusMessagesFactory()
      });
    default:
      return state;
  }
}