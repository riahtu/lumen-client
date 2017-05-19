import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { select } from '@angular-redux/store';
import {ExplorerService} from '../../explorer.service';
import {ExplorerSelectors} from '../../explorer.selectors';

export const UPDATE_INTERVAL = 5000; //5 seconds
export const NAV_LIVE_INTERVAL = 60*60*1000; //1 hour
export const PLOT_LIVE_INTERVAL = 20*60*1000; //20 minutes
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

  public updateTimer: Observable<any>;
  public timerSubscription: Subscription;

  constructor(
    public explorerService: ExplorerService,
    public explorerSelectors: ExplorerSelectors
  ) { 
    this.savePlotImage = new EventEmitter();
    this.saveDataView = new EventEmitter();
    this.loadDataView = new EventEmitter();
    this.updateTimer = Observable.timer(0,UPDATE_INTERVAL);
    this.timerSubscription = null;
  }
  
  ngOnInit() {
    this.explorerSelectors.liveUpdate$
      .subscribe(live => {
        if(live){
          this.timerSubscription = 
            this.updateTimer.subscribe(_ => {
              let now = Date.now();
              this.explorerService.setNavTimeRange({
                min: now - NAV_LIVE_INTERVAL, 
                max: now
              });
              this.explorerService.setPlotTimeRange({
                min: now-PLOT_LIVE_INTERVAL*(1-PLOT_PERCENT_FUTURE),
                max: now+PLOT_LIVE_INTERVAL*(PLOT_PERCENT_FUTURE)
              })
            })
        }
        else if(this.timerSubscription!=null){
          this.timerSubscription.unsubscribe();
          this.timerSubscription=null;
        }
      })
  }
  ngOnDestroy() {
    if(this.timerSubscription!=null){
      this.timerSubscription.unsubscribe();
    }
  }
  
}
