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
  IDataSet,
  IDataViewRecords,
  IDataView
} from '../store/data';

@Injectable()
export class ExplorerSelectors {

  @select(['data', 'dbElements']) elements$: Observable<IDbElementRecords>;
  @select(['data','dataViews']) dataViews$: Observable<IDataViewRecords>;
  //@select(['ui', 'explorer']) uiState$: Observable<IExplorer>;
  @select(['ui', 'explorer', 'left_elements']) leftElementIDs$: Observable<number[]>;
  @select(['ui', 'explorer', 'right_elements']) rightElementIDs$: Observable<number[]>;
  @select(['ui', 'explorer', 'show_plot']) showPlot$: Observable<boolean>;
  @select(['ui', 'explorer', 'show_date_selector']) showDateSelector$: Observable<boolean>;
  @select(['ui', 'explorer', 'plot_time']) plotTimeRange$: Observable<IRange>
  @select(['ui', 'explorer', 'plot_data']) plotData$: Observable<IDataSet>;
  @select(['ui', 'explorer', 'adding_plot_data']) addingPlotData$: Observable<boolean>;
  @select(['ui', 'explorer', 'nav_time']) navTimeRange$: Observable<IRange>
  @select(['ui', 'explorer', 'nav_data']) navData$: Observable<IDataSet>;
  @select(['ui', 'explorer', 'adding_nav_data']) addingNavData$: Observable<boolean>;
  @select(['ui', 'explorer', 'nav_zoom_lock']) navZoomLock$: Observable<boolean>;
  @select(['ui', 'explorer', 'data_cursor']) dataCursor$: Observable<boolean>;
  @select(['ui', 'explorer', 'plot_y1']) plotY1$: Observable<IRange>;
  @select(['ui', 'explorer', 'plot_y2']) plotY2$: Observable<IRange>;

  public leftElements$: Observable<IDbElement[]>
  public rightElements$: Observable<IDbElement[]>
  
  //both left and right elements
  public plottedElements$: Observable<IDbElement[]>
  public isPlotEmpty$: Observable<boolean>

  //is either nav or data loading?
  public isDataLoading$: Observable<boolean>

  public dataViewArray$: Observable<IDataView[]>

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
    
    this.isDataLoading$ = this.addingNavData$
      .combineLatest(this.addingPlotData$)
      .map(([nav,plot])=>nav&&plot )
    
    this.dataViewArray$ = this.dataViews$
      .map(dataViews => {
        return Object.keys(dataViews)
          .map(id => dataViews[id])});
  }
}