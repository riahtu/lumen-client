import { Component, OnInit, ViewChild } from '@angular/core';
import {
  trigger, animate, style, transition } from '@angular/animations';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { IExplorer } from '../../store';
import { ExplorerSelectors } from '../../explorer.selectors';
import { ExplorerService } from '../../explorer.service';

import {
  IDbElement,
  IDbElementRecords
} from '../../../store/data';
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

  constructor(
    public explorerSelectors: ExplorerSelectors,
    public explorerService: ExplorerService
  ) {
    this.plotZValue$ = this.explorerSelectors.showDateSelector$
      .map(show => {
        if(show)
          return -1;
        else
          return 0;
      })
  }

  displayPlotImage(img: string){
    this.imageData = img;
    this.imageModal.show();

  }
  ngOnInit() {
  }



}
