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
import { ExplorerService } from '../../explorer.service';
import { ExplorerSelectors } from '../../explorer.selectors';
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
  //saved by the time range listener if the plot
  //isn't drawn yet
  private storedPlotTimeRange: IRange;

  constructor(
    private renderer: Renderer,
    private explorerSelectors: ExplorerSelectors,
    private explorerService: ExplorerService
  ) {
    this.plot = null;
    this.xBounds = new Subject();
    this.subs = [];
    this.storedPlotTimeRange = { min: null, max: null }
  }

  ngOnInit(
  ) {
    /* load data based on changes to the plotTimeRange */
    this.subs.push(this.explorerSelectors.plotTimeRange$
      .distinctUntilChanged((x, y) => _.isEqual(x, y))
      .combineLatest(this.explorerSelectors.plottedElements$)
      .subscribe(([timeRange, elements]) => {
        this.explorerService.loadPlotData(elements, timeRange)
      }));
    /* set the plotTimeRange based on changes to xbounds */
    this.subs.push(this.xBounds
      .debounceTime(250)
      .distinctUntilChanged((x, y) => _.isEqual(x, y))
      .subscribe(range =>
        this.explorerService.setPlotTimeRange(range)));
    /* set plot axes based on changes to plotTimeRange */
    this.subs.push(this.explorerSelectors.plotTimeRange$
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
    this.subs.push(this.explorerSelectors.dataCursor$
      .distinctUntilChanged()
      .subscribe(val => {
        if (this.plot != null)
          this.plot.enableTooltip(val);
      })
    );
    /* set the left axis (y1) range based on state */
    this.subs.push(this.explorerSelectors.plotY1$
      .subscribe(range => {
        if (this.plot != null) {
          this.plot.getAxes().yaxis.options.min = range.min;
          this.plot.getAxes().yaxis.options.max = range.max;
          this.plot.setupGrid();
          this.plot.draw();
        }
      }));
    /* set the right axis (y2) range based on state */
    this.subs.push(this.explorerSelectors.plotY2$
      .subscribe(range => {
        if (this.plot != null) {
          this.plot.getAxes().y2axis.options.min = range.min;
          this.plot.getAxes().y2axis.options.max = range.max;
          this.plot.setupGrid();
          this.plot.draw();
        }
      }));
    // ---------
    //auto scale the axes to match the data when elements
    //are added to an empty axis
    //autoscale y1 (left)
    this.subs.push(this.explorerSelectors.leftElementIDs$
      .map(ids => ids.length == 0)
      .distinctUntilChanged()
      .filter(isEmpty => isEmpty == true)
      .subscribe(x => {
        if (this.plot == null)
          return;
        this.explorerService.autoScaleAxis('right');
      }));
    this.subs.push(this.explorerSelectors.rightElementIDs$
      .map(ids => ids.length == 0)
      .distinctUntilChanged()
      .filter(isEmpty => isEmpty == true)
      .subscribe(x => {
        if (this.plot == null)
          return;
        this.explorerService.autoScaleAxis('right');
      }));
    

  }
  ngOnDestroy() {
    while (this.subs.length > 0)
      this.subs.pop().unsubscribe()
  }

  ngAfterViewInit() {
    this.subs.push(this.explorerSelectors.leftElements$
      .combineLatest(this.explorerSelectors.rightElements$)
      .map(([left, right]) => { return { left: left, right: right } })
      .combineLatest(this.explorerSelectors.plotData$)
      .subscribe(([elementsByAxis, data]) => {
        //build data structure
        let leftAxis = this.buildDataset(elementsByAxis.left, data, 1);
        let rightAxis = this.buildDataset(elementsByAxis.right, data, 2);
        let dataset = leftAxis.concat(rightAxis);
        if (dataset.length == 0) {
          this.explorerService.hidePlot();
          return; //no data to plot
        }
        this.explorerService.showPlot();
        if (this.plot == null) {
          //let xrange = this.calcDatasetTimeRange(dataset);
          FLOT_OPTIONS.xaxis.min = this.storedPlotTimeRange.min;
          FLOT_OPTIONS.xaxis.max = this.storedPlotTimeRange.max;
          this.plot = $.plot(this.plotArea.nativeElement,
            dataset, FLOT_OPTIONS);
          $(this.plotArea.nativeElement).bind('plotpan', this.updateAxes.bind(this))
          $(this.plotArea.nativeElement).bind('plotzoom', this.updateAxes.bind(this))
          this.explorerService.disableDataCursor();


        } else {
          this.plot.setData(dataset);
          this.plot.setupGrid();
          this.plot.draw();
        }
      }));
  }

  buildDataset(elements: IDbElement[], data: IDataSet, axis: number) {
    return elements.map(element => {
      if (data[element.id] === undefined || data[element.id] == null)
        return null;
      //use custom display_name if present
      let label = element.name;
      if (element.display_name != "")
        label = element.display_name;

      let baseConfig = {
        label: label,
        yaxis: axis,
        //bars: { show: false, barWidth: 2 },
        //points: { show: false },
        color: element.color,
        data: data[element.id].data
      }
      switch (data[element.id].type) {
        case 'raw':
          return baseConfig;
        case 'decimated':
          return Object.assign({}, baseConfig,
            {
              fillArea: [{ opacity: 0.2, representation: "asymmetric" }],
            })
        case 'interval':
          return Object.assign({}, baseConfig,
            {
              label: `${element.name} *`
            })
        default:
          console.log("unknown data type: ", data[element.id].type)
      }
      return
    }).filter(data => data != null)
  }

  //flot hook to listen for zoom/scroll events
  updateAxes() {
    let axes = this.plot.getAxes();
    this.xBounds.next({
      min: Math.round(axes.xaxis.options.min),
      max: Math.round(axes.xaxis.options.max)
    })
  }


}
