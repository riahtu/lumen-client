
import * as actions from './data.actions';
import * as factories from './data.initial-state';
import { recordify,
  IPayloadAction } from '../helpers';
import * as records from './data.types';

export function nilmReducer(
  state: records.INilmRecords = {},
  action: IPayloadAction): records.INilmRecords {
  switch (action.type) {
    case actions.NilmActions.RECEIVE:
      return recordify(action.payload, factories.NilmFactory);
    default:
      return state;
  }
}

export function dbReducer(
  state: records.IDbRecords = {},
  action: IPayloadAction): records.IDbRecords {
  switch (action.type) {
    case actions.DbActions.RECEIVE:
      return recordify(action.payload, factories.DbFactory);
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
