import { Component, OnInit, ViewChild } from '@angular/core';
import {
  trigger, animate, style, transition
} from '@angular/animations';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import * as _ from 'lodash';

import { 
  PlotSelectors,
  MeasurementSelectors
} from '../../selectors';

import { 
  PlotService,
  MeasurementService 
} from '../../services';
import { 
  DataViewService, 
  DbStreamService 
} from '../../../services';
import {
  IDbElement,
  IDataView,
  IDbElementRecords,
  DataViewFactory
} from '../../../store/data';

import { MainPlotComponent } from '../../components/main-plot/main-plot.component';

@Component({
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(100, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])]),
    trigger('fadeOut', [
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])])
  ],
  selector: 'app-explorer-page',
  templateUrl: './explorer.page.html',
  styleUrls: ['./explorer.page.css']
})
export class ExplorerPageComponent implements OnInit {

  public plotZValue$: Observable<number>;
  public imageData: string;
  @ViewChild('imageModal') public imageModal: ModalDirective;
  @ViewChild('saveDataViewModal') public saveDataViewModal: ModalDirective;
  @ViewChild('loadDataViewModal') public loadDataViewModal: ModalDirective;

  @ViewChild('plot') public plot: MainPlotComponent;

  public newDataView: IDataView;

  constructor(
    public plotSelectors: PlotSelectors,
    public measurementSelectors: MeasurementSelectors,
    public plotService: PlotService,
    public measurementService: MeasurementService,
    public dataViewService: DataViewService,
    public dbStreamService: DbStreamService
  ) {
    this.plotZValue$ = this.plotSelectors.showDateSelector$
      .map(show => {
        if (show)
          return -1;
        else
          return 0;
      })
    
  }

  showSaveDataView() {
    this.plot.getCanvas().then(canvas => {
      this.imageData = canvas.toDataURL("image/png");
      this.saveDataViewModal.show();
    });
  }

  createDataView(view: IDataView) {
    this.dataViewService.create(
      view.name,
      view.description,
      view.private,
      view.home,
      view.image);
    this.saveDataViewModal.hide();
  }
  showSavePlotImage() {
    this.plot.getCanvas().then(canvas => {
      this.imageData = canvas.toDataURL("image/png");
      this.imageModal.show();
    });
  }
  showLoadDataView() {
    this.dataViewService
      .loadDataViews()
      .subscribe(
      () => { },
      () => { },
      () => this.plotService.setDataViewsLoaded())

    this.loadDataViewModal.show();
  }
  ngOnInit() {
    this.dataViewService.restoreHomeDataView();
  }



}
