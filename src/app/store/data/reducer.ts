
import * as actions from './actions';
import * as factories from './initial-state';
import * as _ from 'lodash';

import {
  recordify,
  removeByKey,
  removeByValue,
  toArray,
  IPayloadAction
} from '../helpers';
import * as records from './types';

export function nilmReducer(
  state: records.INilmStoreRecord = factories.NilmStoreFactory(),
  action: IPayloadAction): records.INilmStoreRecord {
  switch (action.type) {
    case actions.NilmActions.RECEIVE_ADMIN_NILMS:
      return state
        .set('admin', _.union(state.admin,toArray(action.payload.result)))
        .set('entities', mergeNilmEntities(state.entities, action.payload))
    case actions.NilmActions.RECEIVE_OWNER_NILMS:
      return state
        .set('owner', _.union(state.owner,toArray(action.payload.result)))
        .set('entities', mergeNilmEntities(state.entities, action.payload))
    case actions.NilmActions.RECEIVE_VIEWER_NILMS:
      return state
        .set('viewer', _.union(state.viewer,toArray(action.payload.result)))
        .set('entities', mergeNilmEntities(state.entities, action.payload))
    case actions.NilmActions.RECEIVE_NILM:
      return state
        .set('entities', mergeNilmEntities(state.entities, action.payload))
    case actions.NilmActions.REMOVE_NILM:
      return state
        .set('entities', _.omit(state.entities,action.payload))
        //remove the nilm wherever it is [probably admin]
        .set('admin', state.admin.filter(id => id!=action.payload))
        .set('owner', state.owner.filter(id => id!=action.payload))
        .set('viewer', state.viewer.filter(id => id!=action.payload))
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
  let elemId: number;
  switch (action.type) {
    case actions.DbElementActions.RECEIVE:
      return Object.assign({},
        state,
        recordify(action.payload, factories.DbElementFactory));
    case actions.DbElementActions.SET_COLOR:
      elemId = action.payload.id;
      let color = action.payload.color;
      return Object.assign({}, state,
        {[elemId]: state[elemId].set('color',color)})
    case actions.DbElementActions.SET_DISPLAY_NAME:
      elemId = action.payload.id;
      let name = action.payload.name;
      return Object.assign({}, state,
        {[elemId]: state[elemId].set('display_name',name)})
    default:
      return state;
  }
}

export function userReducer(
  state: records.IUserStoreRecord = factories.UserStoreFactory(),
  action: IPayloadAction): records.IUserStoreRecord {
  switch (action.type) {
    case actions.UserActions.RECEIVE:
      //current user has more data fields, don't 
      //overwrite it with this limited 'public' view
      let others = Object.keys(action.payload)
        .filter(id => +id != state.current)
        .reduce((acc, id: string) => {
          acc[id] = factories.UserFactory(action.payload[id]);
          return acc;
        }, {});
      return state.set('entities', Object.assign({},
        state.entities,
        others));
    case actions.UserActions.SET_CURRENT:
      //let user = factories.UserFactory(action.payload);
      let entity = {};
      entity[action.payload.id] = factories.UserFactory(action.payload);
      return state
        .set('current', action.payload.id)
        .set('entities', Object.assign({},
          state.entities,
          entity));
    default:
      return state;
  }
}

export function userGroupReducer(
  state: records.IUserGroupStoreRecord = factories.UserGroupStoreFactory(),
  action: IPayloadAction): records.IUserGroupStoreRecord {
  switch (action.type) {
    case actions.UserGroupActions.RECEIVE_OWNER_GROUPS:
      return state
        .set('owner', state.owner.concat(action.payload.result))
        .set('entities', mergeGroupEntities(state.entities, action.payload))
    case actions.UserGroupActions.RECEIVE_MEMBER_GROUPS:
      return state
        .set('member', state.member.concat(action.payload.result))
        .set('entities', mergeGroupEntities(state.entities, action.payload))
    case actions.UserGroupActions.RECEIVE_GROUPS:
      return state
        .set('entities', mergeGroupEntities(state.entities, action.payload))
    case actions.UserGroupActions.REMOVE:
      return state
        .set('entities', removeByKey(state.entities, action.payload))
        .set('owner', removeByValue(state.owner, action.payload))
    default:
      return state;
  }
}

export function mergeGroupEntities(currentEntities, payload): any {
  if (payload.entities.user_groups === undefined) {
    return currentEntities;
  }
  return Object.assign({},
    currentEntities,
    recordify(payload.entities.user_groups,
      factories.UserGroupFactory));
}
export function permissionReducer(
  state: records.IPermissionRecords = {},
  action: IPayloadAction): records.IPermissionRecords {
  switch (action.type) {
    case actions.PermissionActions.RECEIVE:
      return Object.assign({},
        state,
        recordify(action.payload, factories.PermissionFactory));
    case actions.PermissionActions.REMOVE:
      let new_state = removeByKey(state, action.payload)
      return new_state;
    default:
      return state;
  }
}
