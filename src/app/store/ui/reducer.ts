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
    case UIActions.ENABLE_EMAILS:
      return state.merge({
        email_enabled: action.payload
      });
    case UIActions.SET_PAGE_HEADER:
      return state.merge({
        page_header: action.payload
      });
    default:
      return state;
  }
}