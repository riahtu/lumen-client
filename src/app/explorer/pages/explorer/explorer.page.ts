import { Component, OnInit } from '@angular/core';
import {
  trigger, animate, style, transition } from '@angular/animations';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { IExplorer } from '../../store';
import { ExplorerSelectors } from '../../explorer.selectors';

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
 /* @select(['data', 'dbElements']) elements$: Observable<IDbElementRecords>;
  @select(['ui', 'explorer']) uiState$: Observable<IExplorer>;

  public leftElements$: Observable<IDbElement[]>
  public rightElements$: Observable<IDbElement[]>*/

  constructor(
    public explorerSelectors: ExplorerSelectors
  ) {}

  ngOnInit() {
    /*this.leftElements$ = this.elements$
      .combineLatest(this.uiState$)
      .map(([elements, state]) => {
        return state.left_elements.map(id => elements[id]);
      });
    this.rightElements$ = this.elements$
      .combineLatest(this.uiState$)
      .map(([elements, state]) => {
        return state.right_elements.map(id => elements[id])
      });*/
  }

}
