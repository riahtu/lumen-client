import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { select } from '@angular-redux/store';
import { ExplorerService } from '../../explorer.service';
import { ExplorerSelectors } from '../../explorer.selectors';

export const LIVE_PLOT_UPDATE_INTERVAL = 5000; //5 seconds
export const LIVE_NAV_UPDATE_INTERVAL = 60*1000; //1 minute

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

  constructor(
    public explorerService: ExplorerService,
    public explorerSelectors: ExplorerSelectors
  ) {
    this.savePlotImage = new EventEmitter();
    this.saveDataView = new EventEmitter();
    this.loadDataView = new EventEmitter();
    this.livePlotUpdateTimer = Observable.timer(0, LIVE_PLOT_UPDATE_INTERVAL);
    this.liveNavUpdateTimer = Observable.timer(0, LIVE_NAV_UPDATE_INTERVAL);

    this.livePlotTimerSubscription = null;
    this.liveNavTimerSubscription = null;
  }

  ngOnInit() {
    this.explorerSelectors.liveUpdate$
      .subscribe(live => {
        if (live)
          this.activateLiveUpdate();
        else
          this.deactivateLiveUpdate();
      })
  }
  ngOnDestroy() {
    this.deactivateLiveUpdate();
  }

  activateLiveUpdate() {
    this.livePlotTimerSubscription =
      this.livePlotUpdateTimer.subscribe(_ => {
        let now = Date.now();
        this.explorerService.setPlotTimeRange({
          min: now - PLOT_LIVE_INTERVAL * (1 - PLOT_PERCENT_FUTURE),
          max: now + PLOT_LIVE_INTERVAL * (PLOT_PERCENT_FUTURE)
        })
      })
    this.liveNavTimerSubscription =
      this.liveNavUpdateTimer.subscribe(_ => {
        let now = Date.now();
        this.explorerService.setNavTimeRange({
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
