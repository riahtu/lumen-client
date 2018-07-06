
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
  state: records.INilmRecords = {},
  action: IPayloadAction): records.INilmRecords {
  switch (action.type) {
    //RECEIVE: update Nilm with server data (implicitly clears "refreshing")
    //
    case actions.NilmActions.RECEIVE:
      return Object.assign({},
        state,
        recordify(action.payload, factories.NilmFactory));
    //REFRESHING: set UI state of Nilm to indicate new data is requested
    //
    case actions.NilmActions.REFRESHING:
      return Object.assign({}, state,
        { [action.payload]: state[action.payload].set('refreshing', true) })
    //REFRESHED: clear "refreshing" UI state (whether or not new data was received)
    //
    case actions.NilmActions.REFRESHED:
      return Object.assign({}, state,
        { [action.payload]: state[action.payload].set('refreshing', false) })
    //REMOVE: remove Nilm from store
    //
    case actions.NilmActions.REMOVE:
      return removeByKey(state, action.payload)
    default:
      return state;
  }
}

export function jouleModuleReducer(
  state: records.IJouleModuleRecords = {},
  action: IPayloadAction): records.IJouleModuleRecords {
  switch (action.type) {
    case actions.JouleModuleActions.RECEIVE:
      return Object.assign({},
        state,
        recordify(action.payload, factories.JouleModuleFactory));
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

    //Receive new elements from server
    //
    case actions.DbElementActions.RECEIVE:
      return Object.assign({},
        state,
        mergeWithDisplayAttrs(
          state, recordify(action.payload, factories.DbElementFactory)));

    //Set element color
    //
    case actions.DbElementActions.SET_COLOR:
      elemId = action.payload.id;
      let color = action.payload.color;
      return Object.assign({}, state,
        { [elemId]: state[elemId].set('color', color) })

    //Set element display name
    //
    case actions.DbElementActions.SET_DISPLAY_NAME:
      elemId = action.payload.id;
      let name = action.payload.name;
      return Object.assign({}, state,
        { [elemId]: state[elemId].set('display_name', name) })

    //Restore elements from a data view (do not merge with display attrs)
    //
    case actions.DbElementActions.RESTORE:
      let data = <records.IDbElementRecords>action.payload;
      let elements = Object.keys(data).reduce((acc, id) => {
        //make sure element JSON corresponds to valid element attributes
        //ensures data views do not corrupt the store if attributes change
        //in future versions
        acc[id] = factories.DbElementFactory(data[id]);
        return acc;
      }, {});
      return Object.assign({}, state, elements);

    //Remove all display attribute settings from elements
    // (color and display name)
    //
    case actions.DbElementActions.RESET:
      return Object.keys(state).reduce((acc, id) => {
        acc[id] = state[id].remove('color').remove('display_name')
        return acc
      }, {})

    default:
      return state;
  }
  /*if this is an update to an existing element, 
    respect the local attributes by merging them in*/
  function mergeWithDisplayAttrs(
    elements: records.IDbElementRecords,
    serverValues: records.IDbElementRecords): records.IDbElementRecords {

    let x = Object.keys(serverValues)
      .map(id => {
        if (elements[id] === undefined)
          return serverValues[id];
        let e = elements[id];
        return serverValues[id]
          .set('display_name', e.display_name)
          .set('color', e.color)
      })
      .reduce((acc: records.IDbElementRecords, element: records.IDbElementRecord) => {
        acc[element.id] = element;
        return acc;
      }, {});
    return x;
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

export function dataViewReducer(
  state: records.IDataViewRecords = {},
  action: IPayloadAction): records.IDataViewRecords {
  switch (action.type) {
    case actions.DataViewActions.RECEIVE:
      //convert the json data into records
      let newViews =
        recordify(action.payload, factories.DataViewFactory);
      //check if any of the new records is a home view
      let newHomeView = Object
        .keys(newViews)
        .map(id => newViews[id])
        .reduce((isSet, view) => isSet || view.home, false)
      if (newHomeView) {
        //the home view changed, clear flag from existing records
        let newState = Object.keys(state)
          .map(id => state[id])
          .map(view => view.set('home', false))
          .reduce((s, view) => {
            s[view.id] = view;
            return s;
          }, <records.IDataViewRecords>{})
        return Object.assign({}, newState, newViews);
      } else {
        //home view not set or unchanged, just add newViews
        return Object.assign({}, state, newViews);
      }
    case actions.DataViewActions.REMOVE:
      let new_state = removeByKey(state, action.payload)
      return new_state;
    default:
      return state;
  }
}