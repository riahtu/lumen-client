import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as _ from 'lodash';
import {
  AnnotationUIActions, IRange, MeasurementActions,
} from '../store';
import { IAppState } from '../../app.store';
import { IDbElement, IAnnotation } from 'app/store/data';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AnnotationUIService {


  constructor(
    private ngRedux: NgRedux<IAppState>,
    private http: HttpClient
  ) {
  }

  //start measurement mode
  //
  public startAnnotation() {
    this.ngRedux.dispatch({
      type: AnnotationUIActions.ENABLE
    })
  }

  //exit measurement mode
  //
  public cancelAnnotation() {
    this.ngRedux.dispatch({
      type: AnnotationUIActions.DISABLE
    })
  }

  //set the range or point to annotate
  //
  public setRange(range: IRange) {
    this.ngRedux.dispatch({
      type: AnnotationUIActions.SET_RANGE,
      payload: range
    })
  }
  //set the range or point to annotate
  //
  public clearRange() {
    this.ngRedux.dispatch({
      type: AnnotationUIActions.CLEAR_RANGE
    })
  }

  //select an annotation to display
  //
  public selectAnnotation(annotation: IAnnotation){
    //remove zero if set because annotation will be displayed instead
    this.ngRedux.dispatch({
      type: MeasurementActions.CLEAR_ZERO
    })
    this.ngRedux.dispatch({
      type: AnnotationUIActions.SHOW_ANNOTATION,
      payload: annotation.id
    })
    
  }

  //hide annotation
  public hideAnnotation(){
    this.ngRedux.dispatch({
      type: AnnotationUIActions.HIDE_ANNOTATION
    })
  }
}