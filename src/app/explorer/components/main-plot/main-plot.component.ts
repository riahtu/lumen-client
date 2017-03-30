import {
  Component,
  ViewChild,
  ElementRef,
  Renderer,
  OnInit,
  OnDestroy,
  AfterViewInit,
  style, state, animate, transition, trigger
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { select } from 'ng2-redux';

import { IData } from '../../../store/data';
import { ExplorerService } from '../../explorer.service';
import { ExplorerSelectors } from '../../explorer.selectors';
import { FLOT_OPTIONS } from './flot.options';
declare var $: any;

@Component({
  animations: [
    trigger('fadeInOut', [
      /*transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),*/
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ],
  selector: 'app-main-plot',
  templateUrl: './main-plot.component.html',
  styleUrls: ['./main-plot.component.css']
})
export class MainPlotComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('plotArea') plotArea: ElementRef
  public showPlot: boolean;

  private sub: Subscription;
  private plot: any;

  constructor(
    private renderer: Renderer,
    private explorerSelectors: ExplorerSelectors,
    private explorerService: ExplorerService
  ) {
    this.plot = null;
    this.showPlot = false; //hide plot when no elements are plotted
  }

  ngOnInit(
  ) {
    this.sub = this.explorerSelectors.plottedElements$
      .combineLatest(this.explorerSelectors.plotTimeRange$)
      .subscribe(([elements, timeRange]) => {
        this.explorerService.loadPlotData(elements, timeRange)
      })

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  public hellohook = function (plot, options) {
    console.log(plot, options)
  }
  ngAfterViewInit() {
    this.explorerSelectors.leftElements$
      .combineLatest(this.explorerSelectors.rightElements$)
      .map(([left, right]) => { return { left: left, right: right } })
      .combineLatest(this.explorerSelectors.plotData$)
      .subscribe(([elementsByAxis, data]) => {
        //build data structure
        let leftAxis = this.buildDataset(elementsByAxis.left, data, 1);
        let rightAxis = this.buildDataset(elementsByAxis.right, data, 2);
        let dataset = leftAxis.concat(rightAxis);
        if (dataset.length == 0) {
          this.showPlot = false;
          return; //no data to plot
        }
        this.showPlot = true;
        if (this.plot == null) {
          this.plot = $.plot(this.plotArea.nativeElement,
            dataset,
            FLOT_OPTIONS);
        } else {
          this.plot.setData(dataset);
          this.plot.setupGrid();
          this.plot.draw();
        }
      })
    //this.renderer.invokeElementMethod(this.plotArea.nativeElement,'focus2');
  }

  buildDataset(elements, data, axis) {
    return elements.map(element => {
      if (data[element.id] === undefined || data[element.id] == null)
        return null;
      return {
        label: element.name,
        yaxis: axis,
        fillArea: [{ opacity: 0.2, representation: "asymmetric" }],
        bars: { show: false, barWidth: 2 },
        points: { show: false },
        color: element.color,
        data: data[element.id].data
      }
    }).filter(data => data != null)
  }
}
