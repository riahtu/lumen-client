import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { IDataView } from '../../../store/data';
import { DataViewService } from '../../../services';
import {ExplorerSelectors} from '../../explorer.selectors';

@Component({
  selector: 'app-load-data-view',
  templateUrl: './load-data-view.component.html',
  styleUrls: ['./load-data-view.component.css']
})
export class LoadDataViewComponent implements OnInit {

  @Output() loaded: EventEmitter<string>;

  constructor(
    public explorerSelectors: ExplorerSelectors,
    private dataViewService: DataViewService
  ) {
    this.loaded = new EventEmitter();
   }

  ngOnInit() {
    
  }

  loadDataView(view: IDataView){
    this.dataViewService.restoreDataView(view)
    this.loaded.next('success');
  }

}
