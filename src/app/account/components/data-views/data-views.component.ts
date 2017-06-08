import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('editDataViewModal') public editViewModal: ModalDirective;
  @select(['data', 'dataViews']) dataViews$: Observable<IDataViewRecords>;
  
  public myDataViewArray$: Observable<IDataView[]>
  
  //the current view being editted
  public activeView: IDataView;

  constructor(
    public dataViewService: DataViewService
  ) {
  }

  //make a bold title with muted description
  formatTitle(view: IDataView){
    let description = view.description==null ? '' : view.description;
    return `<b>${view.name}</b> <span class='text-muted'>${description}</span>`
  }

  editDataView(view){
    this.activeView = view.toJS();
    this.editViewModal.show();
  }
  updateDataView(view){
    this.dataViewService.update(view)
      .subscribe( success => this.editViewModal.hide(),
      _ => console.log('error updating view'))
  }
  ngOnInit() {
     this.myDataViewArray$ = this.dataViews$
      .map(dataViews => {
        return Object.keys(dataViews)
          .map(id => dataViews[id])
          .filter(dataView => {
            return dataView.owner
          });
      });
  }

}
