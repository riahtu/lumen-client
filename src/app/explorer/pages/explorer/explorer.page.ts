import { Component, OnInit, ViewChild } from '@angular/core';
import {
  trigger, animate, style, transition } from '@angular/animations';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { DataViewService } from '../../../services';
import { IExplorer } from '../../store';
import { ExplorerSelectors } from '../../explorer.selectors';
import { ExplorerService } from '../../explorer.service';
import {
  IDbElement,
  IDbElementRecords
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

  public dataViewForm: FormGroup;

  constructor(
    public explorerSelectors: ExplorerSelectors,
    public explorerService: ExplorerService,
    public dataViewService: DataViewService,
    private fb: FormBuilder
  ) {
    this.plotZValue$ = this.explorerSelectors.showDateSelector$
      .map(show => {
        if(show)
          return -1;
        else
          return 0;
      })
  }

  showSaveDataView(){
    this.plot.getCanvas().then(canvas => {
      this.imageData = canvas.toDataURL("image/png");
      this.dataViewForm.reset();
      this.saveDataViewModal.show();
    });
  }
  saveDataView(){
    this.dataViewService.create(
      this.dataViewForm.get('name').value,
      this.dataViewForm.get('description').value,
      this.imageData
    ).subscribe(
      success => this.saveDataViewModal.hide(),
      error => this.saveDataViewModal.hide())
  }

  showSavePlotImage(){
    this.plot.getCanvas().then(canvas => {
      this.imageData = canvas.toDataURL("image/png");
      this.imageModal.show();
    });
  }
  showLoadDataView(){
    this.dataViewService.loadDataViews();
    this.loadDataViewModal.show();
  }
  ngOnInit() {
    this.dataViewForm = this.fb.group({
      name: ['',[Validators.required]],
      description: ['']
    });
  }



}
