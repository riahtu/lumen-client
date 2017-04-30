import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';

import {IAppState} from '../app.store';
import { 
  IExplorer,
  IRange 
} from './store';
import {
  IDbElement,
  IDbElementRecords,
  IDataSet
} from '../store/data';

@Injectable()
export class ExplorerSelectors {

  @select(['data', 'dbElements']) elements$: Observable<IDbElementRecords>;
  //@select(['ui', 'explorer']) uiState$: Observable<IExplorer>;
  @select(['ui', 'explorer', 'left_elements']) leftElementIDs$: Observable<number[]>;
  @select(['ui', 'explorer', 'right_elements']) rightElementIDs$: Observable<number[]>;
  @select(['ui', 'explorer', 'show_plot']) showPlot$: Observable<boolean>;
  @select(['ui', 'explorer', 'show_date_selector']) showDateSelector$: Observable<boolean>;
  @select(['ui', 'explorer', 'plot_time']) plotTimeRange$: Observable<IRange>
  @select(['ui', 'explorer', 'plot_data']) plotData$: Observable<IDataSet>;
  @select(['ui', 'explorer', 'nav_time']) navTimeRange$: Observable<IRange>
  @select(['ui', 'explorer', 'nav_data']) navData$: Observable<IDataSet>;
  @select(['ui', 'explorer', 'nav_zoom_lock']) navZoomLock$: Observable<boolean>;
  @select(['ui', 'explorer', 'data_cursor']) dataCursor$: Observable<boolean>;
  @select(['ui', 'explorer', 'plot_y1']) plotY1$: Observable<IRange>;
  @select(['ui', 'explorer', 'plot_y2']) plotY2$: Observable<IRange>;

  public leftElements$: Observable<IDbElement[]>
  public rightElements$: Observable<IDbElement[]>
  
  //both left and right elements
  public plottedElements$: Observable<IDbElement[]>
  public isPlotEmpty$: Observable<boolean>

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {
    this.leftElements$ = this.elements$
      .combineLatest(this.leftElementIDs$)
      .map(([elements, ids]) => {
        return ids.map(id => elements[id]);
      });
    this.rightElements$ = this.elements$
      .combineLatest(this.rightElementIDs$)
      .map(([elements, ids]) => {
        return ids.map(id => elements[id])
      });
    this.plottedElements$ = this.leftElements$
      .combineLatest(this.rightElements$)
      .map(([left,right]) => left.concat(right))
      
    this.isPlotEmpty$ = this.plottedElements$
      .map(elements => elements.length==0)
  }
}