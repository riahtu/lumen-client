import { Component, OnInit } from '@angular/core';
import {
  trigger, animate, style, transition } from '@angular/animations';
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
      /*transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),*/
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ],
  selector: 'app-explorer-page',
  templateUrl: './explorer.page.html',
  styleUrls: ['./explorer.page.css']
})
export class ExplorerPageComponent implements OnInit {
 
  public plotZValue$: Observable<number>;

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

  ngOnInit() {
  }



}
