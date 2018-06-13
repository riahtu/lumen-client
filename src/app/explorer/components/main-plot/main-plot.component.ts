
import {} from 'rxjs/operators';
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
import { Observable, Subscription, Subject, combineLatest } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged} from 'rxjs/operators';
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

  //make a local copy of FLOT_OPTIONS so the plot
  //can be customized before it is displayed
  private flot_options: any;  

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
    this.flot_options = _.cloneDeep(FLOT_OPTIONS);
    this.subs = [];
    this.storedPlotTimeRange = { min: null, max: null }
  }

  ngOnInit(
  ) {
    /* load data based on changes to the plotTimeRange */
    let newTimeRange = this.plotSelectors.plotTimeRange$.pipe(
      distinctUntilChanged((x, y) => _.isEqual(x, y)))
    let newPlottedElements = this.plotSelectors.plottedElements$.pipe(
      distinctUntilChanged((x,y) => _.isEqual(x,y)));
    this.subs.push(combineLatest(
      newTimeRange, newPlottedElements,this.plotSelectors.addingPlotData$)
      .pipe(
        filter(([timeRange, elements, busy]) => !busy && elements.length!=0))
      .subscribe(([timeRange, elements, busy]) => {
        //retrieve current width of plot to determine the appropriate resolution
        let resolution = $(this.plotArea.nativeElement).width();
        this.plotService.loadPlotData(elements, timeRange, resolution*2)
      }));
    /* set the plotTimeRange based on changes to xbounds */
    this.subs.push(this.xBounds.pipe(
      debounceTime(250),
      distinctUntilChanged((x, y) => _.isEqual(x, y)))
      .subscribe(range =>
        this.plotService.setPlotTimeRange(range)));
    /* set plot axes based on changes to plotTimeRange */
    this.subs.push(this.plotSelectors.plotTimeRange$.pipe(
      distinctUntilChanged((x, y) => _.isEqual(x, y)))
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
    this.subs.push(this.plotSelectors.dataCursor$.pipe(
      distinctUntilChanged())
      .subscribe(val => {
        if (this.plot != null)
          this.plot.enableTooltip(val);
      })
    );
    /* enable selection mode when the plot is in measurement state*/
    this.subs.push(this.measurementSelectors.enabled$.pipe(
      distinctUntilChanged())
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
    this.subs.push(this.plotSelectors.isPlotEmpty$.pipe(
      distinctUntilChanged(),
      filter(isEmpty => isEmpty==true))
      .subscribe(_ => {
        this.plotService.resetTimeRanges();
      }));
    /* set the left axis options based on state */
    let newLeftElementUnits = this.plotSelectors.leftElementUnits$.pipe(
      distinctUntilChanged((x,y) => _.isEqual(x,y)));
    this.subs.push(combineLatest(
      this.plotSelectors.leftAxisSettings$,newLeftElementUnits)
      .subscribe(([settings,units]) => {
        let options = this.flot_options.yaxes[0];
        this.flot_options.legend.left_font_size=settings.legend_font_size;
        if(this.plot!=null){
          this.plot.getOptions().legend.left_font_size=settings.legend_font_size;          
          options = this.plot.getAxes().yaxis.options;
        }
        this.configureAxis(options, settings, units);
        if(this.plot != null){  
          this.plot.setupGrid();
          this.plot.draw();
        }
      }))
    /* set the right axis options based on state */
    let newRightElementUnits = this.plotSelectors.rightElementUnits$.pipe(
      distinctUntilChanged((x,y) => _.isEqual(x,y)));
    this.subs.push(combineLatest(
      this.plotSelectors.rightAxisSettings$, newRightElementUnits)
      .subscribe(([settings,units]) => {
        let options = this.flot_options.yaxes[1];
        this.flot_options.legend.right_font_size=settings.legend_font_size;
        if(this.plot!=null){
          this.plot.getOptions().legend.right_font_size=settings.legend_font_size;          
          options = this.plot.getAxes().y2axis.options;
        }
        this.configureAxis(options, settings, units);
        if(this.plot != null){  
          this.plot.setupGrid();
          this.plot.draw();
        }
      }))
    /* set the time axis options based on state */
    this.subs.push(this.plotSelectors.timeAxisSettings$
      .subscribe(settings => {
        let options = this.flot_options.xaxis;
        if(this.plot!=null){
          options = this.plot.getAxes().xaxis.options;
        }
        if(settings.axis_font_size!=null)
          options.font.size = settings.axis_font_size;
        else
          options.font.size = 12;
        options.ticks = settings.ticks;       
        if(this.plot != null){  
          this.plot.setupGrid();
          this.plot.draw();
        }
      }))

    // ---------
    //auto scale the axes to match the data when elements
    //are added to an empty axis
    //autoscale y1 (left)
    this.subs.push(this.plotSelectors.leftElementIDs$
      .pipe(map(ids => ids.length == 0),
      distinctUntilChanged(),
      filter(isEmpty => isEmpty == true))
      .subscribe(x => {
        if (this.plot == null)
          return;
        this.plotService.autoScaleAxis('left');
      }));
    this.subs.push(this.plotSelectors.rightElementIDs$
      .pipe(map(ids => ids.length == 0),
      distinctUntilChanged(),
      filter(isEmpty => isEmpty == true))
      .subscribe(x => {
        if (this.plot == null)
          return;
        this.plotService.autoScaleAxis('right');
      }));
    //

    /* listen for plot measurements */
    this.subs.push(this.measurementBounds.pipe(
      distinctUntilChanged((x, y) => _.isEqual(x, y)))
      .subscribe( range => {
        this.measurementService.setRange(range);
        //this.measurementModal.show();
      })
    );

    /* show the zero range */
    this.subs.push(this.measurementSelectors.zeroRange$
      .subscribe(range => {
        if(this.plot==null)
          return; //no plot so nothing to highlight

        if(range===undefined || range==null){
          this.plot.showHighlight(false);  
        } else {
          this.plot.setHighlight(range.min, range.max);
        }
      }));
    
    /* remove the measurement selector when range is cleared */
    this.subs.push(this.measurementSelectors.measurementRange$
      .subscribe(range => {
        if(this.plot==null)
          return; //no plot so nothing to do
        if(range==null){
          this.plot.clearSelection(true);
        }
      }))
  }
  
  ngOnDestroy() {
    while (this.subs.length > 0)
      this.subs.pop().unsubscribe()
  }

  ngAfterViewInit() {
    let elementsByAxis = combineLatest(
      this.plotSelectors.leftElements$,this.plotSelectors.rightElements$)
      .pipe(map(([left, right]) => { return { left: left, right: right } }));
    this.subs.push(combineLatest(
        elementsByAxis,
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
          this.flot_options.xaxis.min = this.storedPlotTimeRange.min;
          this.flot_options.xaxis.max = this.storedPlotTimeRange.max;
          this.plot = $.plot(this.plotArea.nativeElement,
            dataset, this.flot_options);
          $(this.plotArea.nativeElement).bind('plotpan', this.updateAxes.bind(this))
          $(this.plotArea.nativeElement).bind('plotzoom', this.updateAxes.bind(this))
          $(this.plotArea.nativeElement).bind('plotselected', this.updateMeasurement.bind(this))
          setTimeout(()=>this.plotService.disableDataCursor(),0);
        
        } else {
          this.plot.setData(dataset);
          this.plot.setupGrid();
          this.plot.draw();
        }
      }));
  }

  
  //flot helper function to customize axes based on settings
  configureAxis(axis_options, settings, units){
    axis_options.axisLabel=this.buildUnitLabel(units,settings.scale);
    if(settings.axis_font_size!=null)
      axis_options.font.size = settings.axis_font_size;
    else
      axis_options.font.size = 12;
    axis_options.ticks = settings.ticks;
    axis_options.tickDecimals = settings.precision;
    axis_options.tickScaler = (val) => {
      if(settings.scale!=null)
        val = (val/(10**settings.scale));
      return val;
    };
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

  //flot helper to add scientific notation to unit
  buildUnitLabel(units,scale){
    if(units==null || units=="none" || units=="event")
      return null;
    switch(scale){
      case -12:
        return "p"+units;
      case -9:
        return "n"+units;
      case -6:
        return "&mu;"+units;
      case -3:
        return "m"+units;
      case null:
      case 0:
        return units;
      case 3:
        return "k"+units;
      case 6:
        return "M"+units;
      case 9:
        return "G"+units;
      case 12:
        return "T"+units;
      default:
        return units+`&times;10<sup>${scale}</sup>`
    }
  }
};


