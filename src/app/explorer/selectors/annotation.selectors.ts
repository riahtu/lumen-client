import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { select } from '@angular-redux/store';
import * as _ from 'lodash';

import { IAppState } from '../../app.store';
import {
  IRange,
} from '../store';
import { IAnnotationRecords, IAnnotation } from 'app/store/data';

export const ANNOTATION_REDUX= ['ui','explorer','annotation'];

@Injectable()
export class AnnotationSelectors {
  @select(['data', 'annotations']) annotations$: Observable<IAnnotationRecords>;
  @select(_.concat(ANNOTATION_REDUX, 'enabled')) enabled$: Observable<boolean>
  @select(_.concat(ANNOTATION_REDUX, 'selection_range')) selectionRange$: Observable<IRange>
  @select(_.concat(ANNOTATION_REDUX, 'selected_annotation')) selectedAnnotationId$: Observable<string>

  public annotationType$: Observable<string>
  public annotatedRange$: Observable<IRange>
  public selectedAnnotation$: Observable<IAnnotation>

  constructor(
    private ngRedux: NgRedux<IAppState>
  ){
    //string for annotation dialog title
    this.annotationType$ = this.selectionRange$
      .pipe(map(range => {
        if(range == null)
          return "unknown";
        if(range.max==null)
          return "Event";
        return "Range";
      }));
    
    // currently selected annotation
    this.selectedAnnotation$ = combineLatest(this.annotations$, this.selectedAnnotationId$).pipe(
      map(([annotations, id]) => {
        if(id==null)
          return null;
        if (annotations[id]===undefined)
          return null;
        return annotations[id]
      }))
  
    // currently selected annotation range (min=max for event annotations)
    this.annotatedRange$ = this.selectedAnnotation$.pipe(
      map(annotation => {
        if(annotation == null){
          return null;
        }
        let range = {
          min: annotation.start,
          max: annotation.end
        }
        if(annotation.end == null)
          range.max = range.min
        return range;
      }))
  }
}