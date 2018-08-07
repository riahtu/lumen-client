
import { IPayloadAction } from '../../store/helpers';
import { InstallationActions } from './actions';
import { IInstallationRecord } from './types';
import {
  INITIAL_STATE
} from './initial-state';


export function reducer(
  state: IInstallationRecord = INITIAL_STATE,
  action: IPayloadAction): IInstallationRecord {
  switch (action.type) {
    case InstallationActions.SELECT_DB_ROOT:
      return state.merge({
        selectedType: 'root'
      });
    case InstallationActions.SELECT_DB_FOLDER:
      return state.merge({
        selectedDbFolder: action.payload.id,
        selectedType: 'dbFolder'
      });
    case InstallationActions.SELECT_DB_STREAM:
      return state.merge({
        selectedDbStream: action.payload.id,
        selectedType: 'dbStream'
      });
    case InstallationActions.SET_ROOT_FOLDER_ID:
      return state.merge({
        rootFolderId: action.payload.id
      });
    case InstallationActions.REFRESHING:
      return state
        .set('refreshing', true)
    case InstallationActions.REFRESHED:
      return state
        .set('refreshing', false)
    default:
      return state;
  }
}
