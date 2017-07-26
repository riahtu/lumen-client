import { Component, Input, OnInit } from '@angular/core';

import {IDbElement} from '../../../store/data';
import { PlotSelectors } from '../../selectors/plot.selectors';

@Component({
  selector: 'app-plot-tab',
  templateUrl: './plot-tab.component.html',
  styleUrls: ['./plot-tab.component.css']
})
export class PlotTabComponent implements OnInit {

  

  constructor(
    public plotSelectors: PlotSelectors
  ) { }

  ngOnInit() {
  }

}
