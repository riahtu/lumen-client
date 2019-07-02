import { IPayloadAction } from '../../../store/helpers';
import { AnnotationUIActions } from './actions';
import {
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
    //enter measurement mode
    //
    case AnnotationUIActions.ENABLE:
      return state
        .set('enabled', true);

    //cancel measurement mode
    //
    case AnnotationUIActions.DISABLE:
      return state
        .set('enabled', false);


    //set the selected range
    case AnnotationUIActions.SET_RANGE:
      return state
        .set('selection_range', action.payload)
    
    //clear the range
    case AnnotationUIActions.CLEAR_RANGE:
      return state
        .set('selection_range', null)

    //select an annotation to display
    case AnnotationUIActions.SHOW_ANNOTATION:
      return state
        .set('selected_annotation', action.payload)

    //hide the selected annotation (if any)
    case AnnotationUIActions.HIDE_ANNOTATION:
      return state
        .set('selected_annotation', null)

    
    default:
      return state;
  }
}
