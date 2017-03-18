import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { IExplorer } from '../../store';
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
  @select(['data', 'dbElements']) elements$: Observable<IDbElementRecords>;
  @select(['ui', 'explorer']) uiState$: Observable<IExplorer>;

  public leftElements$: Observable<IDbElement[]>
  public rightElements$: Observable<IDbElement[]>

  public testLeftElements: IDbElement[];
  public testRightElements: IDbElement[];
  constructor() {
    this.testLeftElements=[];
    for (var _i = 0; _i < 5; _i++) {
      this.testLeftElements.push({
        id: _i,
        name: `test${_i}`,
        units: 'volts',
        column: _i,
        default_max: 0,
        default_min: 0,
        scale_factor: 0,
        offset: 0,
        plottable: true,
        discrete: false
      });
    }
  }

  ngOnInit() {
    this.leftElements$ = this.elements$
      .combineLatest(this.uiState$)
      .map(([elements, state]) => {
        let x = state.left_elements.map(id => elements[id]);
        return x;
      });
    this.rightElements$ = this.elements$
      .combineLatest(this.uiState$)
      .map(([elements, state]) => {
        return state.right_elements.map(id => elements[id])
      });

  }

}
