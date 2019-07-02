
import {
    IState,
    IStateRecord,
  } from './types';
  
  import { makeTypedFactory } from 'typed-immutable-record';
  
  
  // ---- Plot ----
  export const AnnotationFactory =
    makeTypedFactory<IState, IStateRecord>({
      enabled: false,
      selection_range: null,
      selected_annotation: null,
      annotated_streams: []
    });
  
  
  export const INITIAL_STATE = AnnotationFactory();
  