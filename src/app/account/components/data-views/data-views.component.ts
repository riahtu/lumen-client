import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { ModalDirective } from 'ngx-bootstrap/modal';

import {
  DataViewService
} from '../../../services';
import {
  IDataView,
  IDataViewRecords
} from '../../../store/data';

@Component({
  selector: 'app-data-views',
  templateUrl: './data-views.component.html',
  styleUrls: ['./data-views.component.css']
})
export class DataViewsComponent implements OnInit {

  @select(['data', 'dataViews']) dataViews$: Observable<IDataViewRecords>;
  public myDataViewArray$: Observable<IDataView[]>

  constructor(
    public dataViewService: DataViewService
  ) {
   this.dataViewService.loadDataViews();
     this.myDataViewArray$ = this.dataViews$
      .map(dataViews => {
        return Object.keys(dataViews)
          .map(id => dataViews[id])
          .filter(dataView => {
            return dataView.owner
          });
      });
  }

  ngOnInit() {
    
  }

}
