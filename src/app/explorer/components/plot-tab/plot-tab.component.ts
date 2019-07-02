import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import * as _ from 'lodash';

import { PlotSelectors } from '../../selectors/plot.selectors';
import { PlotService, AnnotationUIService } from '../../services';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { distinctUntilChanged, map, filter } from 'rxjs/operators';
import { AnnotationService } from 'app/services';
import { AnnotationSelectors, MeasurementSelectors } from 'app/explorer/selectors';
import { IDbStream, IAnnotation } from 'app/store/data';

@Component({
  selector: 'app-plot-tab',
  templateUrl: './plot-tab.component.html',
  styleUrls: ['./plot-tab.component.css'],
  animations: [
    // animation triggers go here
    trigger('slideUpDown', [
      state('in', style({ transform: 'translateY(0)' })),
      transition(':enter', [
        style({'overflow': 'hidden', 'height': 0}),
        animate(300, style({ 'height': 80}))
      ]),
      transition(':leave', [
        style({'overflow': 'hidden'}),
        animate(300, style({ 'height': 0}))
      ])
    ]),
  ]
})
export class PlotTabComponent implements OnInit, OnDestroy {

  
  private subs: Subscription[];
  public annotationMap$: Observable<IAnnotatedStream[]>

  constructor(
    public plotSelectors: PlotSelectors,
    public plotService: PlotService,
    public annotationService: AnnotationService,
    public annotationUIService: AnnotationUIService,
    public annotationSelectors: AnnotationSelectors,
    public measurementSelectors: MeasurementSelectors
  ) {
    this.subs = [];
   }

  ngOnInit() {
    this.subs.push(this.plotSelectors.plottedStreams$.pipe(
      map(streams => streams.map(stream=>stream.id)),
      distinctUntilChanged((x,y)=>_.isEqual(x,y)))
      .subscribe( stream_ids => {
        console.log(stream_ids);
        stream_ids.map(id => {
          this.annotationService.loadAnnotations(id)
        })
      })
    )

    this.annotationMap$ = combineLatest(
        this.annotationSelectors.annotations$,
        this.plotSelectors.plottedStreams$).pipe(
        map(([annotations, streams]) => {
          return streams.map(stream => {
            return{
              stream: stream,
              annotations: _.filter(annotations, 
                annotation => annotation.db_stream_id == stream.id)
            }
          })
        })
      )
  }
  ngOnDestroy() {
    while (this.subs.length > 0)
      this.subs.pop().unsubscribe()
  }
  public deleteAnnotation($event, annotation:IAnnotation){
    $event.stopPropagation();
    this.annotationService.deleteAnnotation(annotation)
  }
}

export interface IAnnotatedStream{
  stream: IDbStream,
  annotations: IAnnotation[]
}
