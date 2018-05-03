import { IPayloadAction } from '../../../store/helpers';
import { InterfaceActions } from './actions';
import {
  IState,
  IStateRecord
} from './types';

import {
  INITIAL_STATE
} from './initial-state';

import * as _ from 'lodash';


export function reducer(
  state: IStateRecord = INITIAL_STATE,
  action: IPayloadAction): IStateRecord {

  switch (action.type) {
    //add interface to the display and select it
    //
    case InterfaceActions.ADD:
      //just select the id if it is already in the state
      if(state['displayed'].indexOf(action.payload) > -1)
        return state.set('selected',action.payload)
      return state
        .set('displayed',state['displayed'].concat([action.payload]))
        .set('selected',action.payload);
    
    //remove interface from the display
    //
    case InterfaceActions.REMOVE:
      //if removed interface is selected switch to explorer
      if(state['selected']==action.payload)
        return state
          .set('selected', null)
          .set('displayed', 
            state['displayed'].filter(id => id!=action.payload));
      //otherwise just remove the interface
      return state
        .set('displayed',
          state['displayed'].filter(id => id!=action.payload));

    //select a displayed interface
    case InterfaceActions.SELECT:
      return state.set('selected',action.payload)

    default:
      return state;
  }
}
