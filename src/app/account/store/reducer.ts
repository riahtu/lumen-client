import { IPayloadAction } from '../../store/helpers';
import { AccountActions } from './actions';
import { IAccountRecord } from './types';
import {
  AccountFactory,
  INITIAL_STATE
} from './initial-state';

export function reducer(
  state: IAccountRecord = INITIAL_STATE,
  action: IPayloadAction): IAccountRecord {

  switch (action.type) {

    //set flag to indicate nilms are loaded
    //
    case AccountActions.SET_NILMS_LOADED:
      return state
        .set('nilms_loaded', true);

    //set flag to indicate data views are loaded
    //
    case AccountActions.SET_DATA_VIEWS_LOADED:
      return state
        .set('data_views_loaded', true);

    //set flag to indicate user groups are loaded
    //
    case AccountActions.SET_USER_GROUPS_LOADED:
      return state
        .set('user_groups_loaded', true);
    default:
      return state;

  }
}

