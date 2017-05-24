import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { IDataView } from '../../../store/data';
import { DataViewService } from '../../../services';
import { ExplorerService } from '../../explorer.service';
import {ExplorerSelectors} from '../../explorer.selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-load-data-view',
  templateUrl: './load-data-view.component.html',
  styleUrls: ['./load-data-view.component.css']
})
export class LoadDataViewComponent implements OnInit {

  @Output() loaded: EventEmitter<string>;
  public hasViews$: Observable<boolean>;
  public hasFilteredViews$: Observable<boolean>;

  constructor(
    public explorerSelectors: ExplorerSelectors,
    public explorerService: ExplorerService,
    private dataViewService: DataViewService
  ) {
    this.loaded = new EventEmitter();
   }

  ngOnInit() {

    this.hasViews$ = 
      this.explorerSelectors.dataViews$
        .map(records => Object.keys(records))
        .map(ids => ids.length!=0)
        
    this.hasFilteredViews$ = 
      this.explorerSelectors.filteredDataViews$
        .map(views => views.length>0)
  }

  loadDataView(view: IDataView){
    this.dataViewService.restoreDataView(view)
    this.loaded.next('success');
  }
  setDataViewFilterText(text: string){
    this.explorerService.setDataViewFilterText(text);
  }
  setShowPublicDataViews(val: boolean){
    this.explorerService.setShowPublicDataViews(val);
  }


}
