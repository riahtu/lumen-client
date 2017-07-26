import {
  Component,
  ViewChild,
  ElementRef,
  Renderer,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { select } from '@angular-redux/store';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { IRange } from '../../store';
import {
  IDataSet,
  IDbElement
} from '../../../store/data';
import { 
  PlotService,
  MeasurementService 
} from '../../services';
import { 
  PlotSelectors,
  MeasurementSelectors 
} from '../../selectors';

import { FLOT_OPTIONS } from './flot.options';

import * as _ from 'lodash';

declare var $: any;

@Component({

  selector: 'app-main-plot',
  templateUrl: './main-plot.component.html',
  styleUrls: ['./main-plot.component.css']
})
export class MainPlotComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('plotArea') plotArea: ElementRef

  private subs: Subscription[];
  private plot: any;

  private xBounds: Subject<IRange>
  private measurementBounds: Subject<IRange>

  //saved by the time range listener if the plot
  //isn't drawn yet
  private storedPlotTimeRange: IRange;
  
  constructor(
    private renderer: Renderer,
    private plotSelectors: PlotSelectors,
    private measurementSelectors: MeasurementSelectors,
    private plotService: PlotService,
    private measurementService: MeasurementService
  ) {
    this.plot = null;
    this.xBounds = new Subject();
    this.measurementBounds = new Subject();
    this.subs = [];
    this.storedPlotTimeRange = { min: null, max: null }
  }

  ngOnInit(
  ) {
    /* load data based on changes to the plotTimeRange */
    this.subs.push(this.plotSelectors.plotTimeRange$
      .distinctUntilChanged((x, y) => _.isEqual(x, y))
      .combineLatest(this.plotSelectors.plottedElements$
        .distinctUntilChanged((x,y) => _.isEqual(x,y)),
        this.plotSelectors.addingPlotData$)
      .filter(([timeRange, elements, busy]) => !busy && elements.length!=0)
      .subscribe(([timeRange, elements, busy]) => {
        //retrieve current width of plot to determine the appropriate resolution
        let resolution = $(this.plotArea.nativeElement).width();
        this.plotService.loadPlotData(elements, timeRange, resolution*2)
      }));
    /* set the plotTimeRange based on changes to xbounds */
    this.subs.push(this.xBounds
      .debounceTime(250)
      .distinctUntilChanged((x, y) => _.isEqual(x, y))
      .subscribe(range =>
        this.plotService.setPlotTimeRange(range)));
    /* set plot axes based on changes to plotTimeRange */
    this.subs.push(this.plotSelectors.plotTimeRange$
      .distinctUntilChanged((x, y) => _.isEqual(x, y))
      .subscribe(timeRange => {
        if (this.plot == null) {
          this.storedPlotTimeRange = timeRange;
          return;
        }
        let xaxis = this.plot.getAxes().xaxis;
        xaxis.options.min = timeRange.min;
        xaxis.options.max = timeRange.max;
        this.plot.setupGrid();
        this.plot.draw();
      }));
    /* set data cursor visibility based on state */
    this.subs.push(this.plotSelectors.dataCursor$
      .distinctUntilChanged()
      .subscribe(val => {
        if (this.plot != null)
          this.plot.enableTooltip(val);
      })
    );
    /* enable selection mode when the plot is in measurement state*/
    this.subs.push(this.measurementSelectors.enabled$
      .distinctUntilChanged()
      .subscribe(val => {
        if (this.plot != null){
          if(val){ //enter measurement mode
            //enable selection
            this.plot.getOptions()['selection']['interactive']="true";
            //disable pan/zoom
            this.plot.getOptions()['zoom']['interactive']=false;
            this.plot.getOptions()['pan']['interactive']=false;
          } else {
            //disable selection
            this.plot.getOptions()['selection']['interactive']=false;
            this.plot.clearSelection(true);
            //enable pan/zoom
            this.plot.getOptions()['zoom']['interactive']=true;
            this.plot.getOptions()['pan']['interactive']=true;          }
        }
      })
    );
    /* set the left axis (y1) range based on state */
    this.subs.push(this.plotSelectors.plotY1$
      .subscribe(range => {
        if (this.plot != null) {
          this.plot.getAxes().yaxis.options.min = range.min;
          this.plot.getAxes().yaxis.options.max = range.max;
          this.plot.setupGrid();
          this.plot.draw();
        }
      }));
    /* set the right axis (y2) range based on state */
    this.subs.push(this.plotSelectors.plotY2$
      .subscribe(range => {
        if (this.plot != null) {
          this.plot.getAxes().y2axis.options.min = range.min;
          this.plot.getAxes().y2axis.options.max = range.max;
          this.plot.setupGrid();
          this.plot.draw();
        }
      }));
    /* remove time bounds when plot is empty (so new elements auto scale)*/
    this.subs.push(this.plotSelectors.isPlotEmpty$
      .distinctUntilChanged()
      .filter(isEmpty => isEmpty==true)
      .subscribe(_ => {
        this.plotService.resetTimeRanges();
      }));
    // ---------
    //auto scale the axes to match the data when elements
    //are added to an empty axis
    //autoscale y1 (left)
    this.subs.push(this.plotSelectors.leftElementIDs$
      .map(ids => ids.length == 0)
      .distinctUntilChanged()
      .filter(isEmpty => isEmpty == true)
      .subscribe(x => {
        if (this.plot == null)
          return;
        this.plotService.autoScaleAxis('left');
      }));
    this.subs.push(this.plotSelectors.rightElementIDs$
      .map(ids => ids.length == 0)
      .distinctUntilChanged()
      .filter(isEmpty => isEmpty == true)
      .subscribe(x => {
        if (this.plot == null)
          return;
        this.plotService.autoScaleAxis('right');
      }));
    //

    /* listen for plot measurements */
    this.subs.push(this.measurementBounds
      .distinctUntilChanged((x, y) => _.isEqual(x, y))
      .subscribe( range => {
        this.measurementService.setRange(range);
        //this.measurementModal.show();
      })
    );

  }
  ngOnDestroy() {
    while (this.subs.length > 0)
      this.subs.pop().unsubscribe()
  }

  ngAfterViewInit() {
    this.subs.push(this.plotSelectors.leftElements$
      .combineLatest(this.plotSelectors.rightElements$)
      .map(([left, right]) => { return { left: left, right: right } })
      .combineLatest(
        this.plotSelectors.plotData$, 
        this.plotSelectors.showDataEnvelope$)
      .subscribe(([elementsByAxis, data, showEnvelope]) => {
        //build data structure
        let leftAxis = this.plotService
          .buildDataset(elementsByAxis.left, data, 1, showEnvelope);
        let rightAxis = this.plotService
          .buildDataset(elementsByAxis.right, data, 2, showEnvelope);
        let dataset = leftAxis.concat(rightAxis);
        if (dataset.length == 0) {
          this.plotService.hidePlot();
          return; //no data to plot
        }
        this.plotService.showPlot();
        if (this.plot == null) {
          FLOT_OPTIONS.xaxis.min = this.storedPlotTimeRange.min;
          FLOT_OPTIONS.xaxis.max = this.storedPlotTimeRange.max;
          this.plot = $.plot(this.plotArea.nativeElement,
            dataset, FLOT_OPTIONS);
          $(this.plotArea.nativeElement).bind('plotpan', this.updateAxes.bind(this))
          $(this.plotArea.nativeElement).bind('plotzoom', this.updateAxes.bind(this))
          $(this.plotArea.nativeElement).bind('plotselected', this.updateMeasurement.bind(this))

          this.plotService.disableDataCursor();
        } else {
          this.plot.setData(dataset);
          this.plot.setupGrid();
          this.plot.draw();
        }
      }));
  }

  
  //flot hook to listen for zoom/scroll events
  updateAxes() {
    let axes = this.plot.getAxes();
    this.xBounds.next({
      min: Math.round(axes.xaxis.options.min),
      max: Math.round(axes.xaxis.options.max)
    })
  }

  //flot hook to listen for plot selection events (measurements)
  updateMeasurement() {
    let selection = this.plot.getSelection();
    this.measurementBounds.next({
      min: Math.round(selection['xaxis']['from']),
      max: Math.round(selection['xaxis']['to'])
    })
  }

  getCanvas(): Html2CanvasPromise<HTMLCanvasElement> {
    return html2canvas(this.plotArea.nativeElement);
  };

};
