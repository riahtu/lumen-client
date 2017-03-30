import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { IExplorer } from '../../store';
import { ExplorerSelectors } from '../../explorer.selectors';

import {
  IDbElement,
  IDbElementRecords
} from '../../../store/data';
@Component({
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
    private explorerSelectors: ExplorerSelectors
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
