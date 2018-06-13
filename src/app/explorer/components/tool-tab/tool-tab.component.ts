
import {distinctUntilChanged, filter} from 'rxjs/operators';
import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { select } from '@angular-redux/store';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {
  PlotService,
  MeasurementService
} from '../../services';
import {
  MeasurementSelectors,
  PlotSelectors
} from '../../selectors';

export const LIVE_PLOT_UPDATE_INTERVAL = 5000; //5 seconds
export const LIVE_NAV_UPDATE_INTERVAL = 60 * 1000; //1 minute

export const NAV_LIVE_INTERVAL = 60 * 60 * 1000; //1 hour
export const PLOT_LIVE_INTERVAL = 20 * 60 * 1000; //20 minutes
export const PLOT_PERCENT_FUTURE = 0.1; //10% of plot is in future

@Component({
  selector: 'app-tool-tab',
  templateUrl: './tool-tab.component.html',
  styleUrls: ['./tool-tab.component.css']
})

export class ToolTabComponent implements OnInit, OnDestroy {
  @Output() savePlotImage: EventEmitter<string>;
  @Output() saveDataView: EventEmitter<string>;
  @Output() loadDataView: EventEmitter<string>;

  public livePlotUpdateTimer: Observable<any>;
  public liveNavUpdateTimer: Observable<any>;
  public livePlotTimerSubscription: Subscription;
  public liveNavTimerSubscription: Subscription;

  private subs: Subscription[];

  constructor(
    public plotService: PlotService,
    public measurementService: MeasurementService,
    public plotSelectors: PlotSelectors,
    public measurementSelectors: MeasurementSelectors
  ) {
    this.savePlotImage = new EventEmitter();
    this.saveDataView = new EventEmitter();
    this.loadDataView = new EventEmitter();
    this.livePlotUpdateTimer = timer(0, LIVE_PLOT_UPDATE_INTERVAL);
    this.liveNavUpdateTimer = timer(0, LIVE_NAV_UPDATE_INTERVAL);

    this.livePlotTimerSubscription = null;
    this.liveNavTimerSubscription = null;
    this.subs = [];
  }

  ngOnInit() {
    this.plotSelectors.liveUpdate$
      .subscribe(live => {
        if (live)
          this.activateLiveUpdate();
        else
          this.deactivateLiveUpdate();
      })
    /* remove time bounds when plot is empty (so new elements auto scale)*/
    this.subs.push(this.plotSelectors.isPlotEmpty$.pipe(
      distinctUntilChanged(),
      filter(isEmpty => isEmpty == true))
      .subscribe(_ => {
        this.plotService.disableLiveUpdate();
      }));
    
  }
  ngOnDestroy() {
    this.deactivateLiveUpdate();
    while (this.subs.length > 0)
      this.subs.pop().unsubscribe()
  }

  activateLiveUpdate() {
    this.livePlotTimerSubscription =
      this.livePlotUpdateTimer.subscribe(_ => {
        let now = Date.now();
        this.plotService.setPlotTimeRange({
          min: now - PLOT_LIVE_INTERVAL * (1 - PLOT_PERCENT_FUTURE),
          max: now + PLOT_LIVE_INTERVAL * (PLOT_PERCENT_FUTURE)
        })
      })
    this.liveNavTimerSubscription =
      this.liveNavUpdateTimer.subscribe(_ => {
        let now = Date.now();
        this.plotService.setNavTimeRange({
          min: now - NAV_LIVE_INTERVAL,
          max: now
        });
      })
  }

  deactivateLiveUpdate() {
    if (this.livePlotTimerSubscription != null) {
      this.livePlotTimerSubscription.unsubscribe();
      this.livePlotTimerSubscription = null;
    }
    if (this.liveNavTimerSubscription != null) {
      this.liveNavTimerSubscription.unsubscribe();
      this.liveNavTimerSubscription = null;
    }
  }
}
