import { Component, Input, OnInit } from '@angular/core';

import {IDbElement} from '../../../store/data';
import { PlotSelectors } from '../../selectors/plot.selectors';
import { PlotService } from '../../services';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-plot-tab',
  templateUrl: './plot-tab.component.html',
  styleUrls: ['./plot-tab.component.css'],
  animations: [
    // animation triggers go here
    trigger('slideUpDown', [
      state('in', style({ transform: 'translateY(0)' })),
      transition(':enter', [
        style({'overflow': 'hidden', 'height': 0}),
        animate(300, style({ 'height': 80}))
      ]),
      transition(':leave', [
        style({'overflow': 'hidden'}),
        animate(300, style({ 'height': 0}))
      ])
    ]),
  ]
})
export class PlotTabComponent implements OnInit {

  

  constructor(
    public plotSelectors: PlotSelectors,
    public plotService: PlotService
  ) { }

  ngOnInit() {
  }
}
