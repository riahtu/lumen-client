import {
  Component,
  ViewChild,
  ElementRef,
  Renderer,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { select } from '@angular-redux/store';
import {
  IRange
} from '../../store';

import {
  IDataSet,
  IDbElement
} from '../../../store/data';
import { PlotService } from '../../services/plot.service';
import { PlotSelectors } from '../../selectors/plot.selectors';
import { FLOT_OPTIONS } from './flot.options';
import * as _ from 'lodash';

declare var $: any;
@Component({
  selector: 'app-nav-plot',
  templateUrl: './nav-plot.component.html',
  styleUrls: ['./nav-plot.component.css']
})
export class NavPlotComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('plotArea') plotArea: ElementRef

  private subs: Subscription[];
  private plot: any;

  private xBounds: Subject<IRange>
  //saved by the time range listener if the plot
  //isn't drawn yet
  private storedPlotTimeRange: IRange;

  constructor(
    private renderer: Renderer,
    private plotSelectors: PlotSelectors,
    private plotService: PlotService
  ) {
    this.plot = null;
    this.xBounds = new Subject();
    this.subs = [];
    this.storedPlotTimeRange = { min: null, max: null }
  }

  ngOnInit(
  ) {
    /* load data based on changes to navTimeRange */
    this.subs.push(this.plotSelectors.navTimeRange$
      .distinctUntilChanged((x, y) => _.isEqual(x, y))
      .combineLatest(this.plotSelectors.plottedElements$
        .distinctUntilChanged((x,y) => _.isEqual(x,y)),
        this.plotSelectors.addingNavData$)
      .filter(([timeRange, elements, busy]) => !busy && elements.length!=0)
      .subscribe(([timeRange, elements, busy]) => {
        let resolution = $(this.plotArea.nativeElement).width()
        this.plotService.loadNavData(elements, timeRange, resolution);
        if (this.plot != null)
          this.plot.clearSelection(true);
      }));
    /* set the plot time range based on changes to selected range */
    this.subs.push(this.xBounds
      .debounceTime(100)
      .distinctUntilChanged((x, y) => _.isEqual(x, y))
      .subscribe(range => this.plotService.setPlotTimeRange(range)));
    /* set the selection window to track the plot time range */
    this.subs.push(this.plotSelectors.plotTimeRange$
      .distinctUntilChanged((x, y) => _.isEqual(x, y))
      .subscribe(timeRange => {
        if (this.plot == null) {
          return;
        }
        this.plot.setSelection(
          { xaxis: { from: timeRange.min, to: timeRange.max } },
          true); //do not fire the plot selected event
      }));
    /* toggle the zoom lock feature based on the state */
    this.subs.push(this.plotSelectors.navZoomLock$
      .distinctUntilChanged()
      .subscribe(val => {
        if (this.plot != null)
          this.plot.lockZoom(val);
      }));
    /* set nav plot axes based on changes to navTimeRange */
    this.subs.push(this.plotSelectors.navTimeRange$
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
  }
  ngOnDestroy() {
    while (this.subs.length > 0)
      this.subs.pop().unsubscribe()
  }

  ngAfterViewInit() {
    /* update the plot when new data comes in */
    this.subs.push(this.plotSelectors.leftElements$
      .combineLatest(this.plotSelectors.rightElements$)
      .map(([left, right]) => { return { left: left, right: right } })
      .combineLatest(this.plotSelectors.navData$, this.plotSelectors.showDataEnvelope$)
      .subscribe(([elementsByAxis, data, showEnvelope]) => {
        //build data structure
        let leftAxis = this.plotService
          .buildDataset(elementsByAxis.left, data, 1, showEnvelope);
        let rightAxis = this.plotService
          .buildDataset(elementsByAxis.right, data, 2, showEnvelope);
        let dataset = leftAxis.concat(rightAxis);
        if (dataset.length == 0) {
          return; //no data to plot
        }
        if (this.plot == null) {
          FLOT_OPTIONS.xaxis.min = this.storedPlotTimeRange.min;
          FLOT_OPTIONS.xaxis.max = this.storedPlotTimeRange.max;
          this.plot = $.plot(this.plotArea.nativeElement,
            dataset, FLOT_OPTIONS);
          this.plotService.disableNavZoomLock();
          $(this.plotArea.nativeElement).bind('plotselected', this.selectRange.bind(this))

        } else {
          this.plot.setData(dataset);
          this.plot.setupGrid();
          this.plot.draw();
        }
      }));
  }
  //flot hook to listen for selection events
  selectRange(event, range) {
    this.xBounds.next({
      min: Math.round(range.xaxis.from),
      max: Math.round(range.xaxis.to)
    })
  }

}
