import { IPayloadAction } from '../helpers';
import { InstallationsActions } from './installations.actions';
import { IInstallationsRecord } from './installations.types';
import {
  INITIAL_STATE
} from './installations.initial-state';

import {
  StatusMessagesFactory
} from '../helpers';

export function installationsReducer(
  state: IInstallationsRecord = INITIAL_STATE,
  action: IPayloadAction): IInstallationsRecord {
  switch (action.type) {
    case InstallationsActions.SET_PAGE_MESSAGES:
      return state.merge({
        pageMessages: StatusMessagesFactory(action.payload)
      });
    case InstallationsActions.CLEAR_PAGE_MESSAGES:
      return state.merge({
        pageMessages: StatusMessagesFactory()
      });
    default:
      return state;
  }
}