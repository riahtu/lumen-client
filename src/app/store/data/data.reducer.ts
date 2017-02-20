
import * as actions from './data.actions';
import * as factories from './data.initial-state';
import {
  recordify,
  IPayloadAction
} from '../helpers';
import * as records from './data.types';

export function nilmReducer(
  state: records.INilmStoreRecord = factories.NilmStoreFactory(),
  action: IPayloadAction): records.INilmStoreRecord {
  switch (action.type) {
    case actions.NilmActions.RECEIVE_ADMIN_NILMS:
      return state.set('admin', action.payload.result)
        .set('entities', mergeNilmEntities(state.entities,
          action.payload))
    case actions.NilmActions.RECEIVE_OWNER_NILMS:
      return state.set('owner', action.payload.result)
        .set('entities', mergeNilmEntities(state.entities,
          action.payload))
    case actions.NilmActions.RECEIVE_VIEWER_NILMS:
      return state.set('viewer', action.payload.result)
        .set('entities', mergeNilmEntities(state.entities,
          action.payload))
    case actions.NilmActions.RECEIVE_NILM:
      return state.set('entities', mergeNilmEntities(state.entities,
        action.payload))
    default:
      return state;
  }
}

export function mergeNilmEntities(currentEntities, payload): any {
  if (payload.entities.nilms === undefined) {
    return currentEntities;
  }
  return Object.assign({},
    currentEntities,
    recordify(payload.entities.nilms,
      factories.NilmFactory));
}

export function dbReducer(
  state: records.IDbRecords = {},
  action: IPayloadAction): records.IDbRecords {
  switch (action.type) {
    case actions.DbActions.RECEIVE:
      return Object.assign({},
        state,
        recordify(action.payload, factories.DbFactory));
    default:
      return state;
  }
}

export function dbFolderReducer(
  state: records.IDbFolderRecords = {},
  action: IPayloadAction): records.IDbFolderRecords {
  switch (action.type) {
    case actions.DbFolderActions.RECEIVE:
      return Object.assign({},
        state,
        recordify(action.payload, factories.DbFolderFactory));
    default:
      return state;
  }
}

export function dbStreamReducer(
  state: records.IDbStreamRecords = {},
  action: IPayloadAction): records.IDbStreamRecords {
  switch (action.type) {
    case actions.DbStreamActions.RECEIVE:
      return Object.assign({},
        state,
        recordify(action.payload, factories.DbStreamFactory));

    default:
      return state;
  }
}

export function dbElementReducer(
  state: records.IDbElementRecords = {},
  action: IPayloadAction): records.IDbElementRecords {
  switch (action.type) {
    case actions.DbElementActions.RECEIVE:
      return Object.assign({},
        state,
        recordify(action.payload, factories.DbElementFactory));

    default:
      return state;
  }
}

export function userReducer(
  state: records.IUserRecord = factories.UserFactory(),
  action: IPayloadAction): records.IUserRecord {
  switch (action.type) {
    case actions.UserActions.RECEIVE:
      return factories.UserFactory(action.payload);
    default:
      return state;
  }
}


export function permissionReducer(
  state: records.IPermissionRecords = {},
  action: IPayloadAction): records.IPermissionRecords {
  switch (action.type) {
    case actions.PermissionActions.RECEIVE:
      return Object.assign({},
        state,
        recordify(action.payload, factories.PermissionFactory));
    default:
      return state;
  }
}