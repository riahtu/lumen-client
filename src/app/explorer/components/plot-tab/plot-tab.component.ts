import { Component, Input, OnInit } from '@angular/core';

import {IDbElement} from '../../../store/data';

@Component({
  selector: 'app-plot-tab',
  templateUrl: './plot-tab.component.html',
  styleUrls: ['./plot-tab.component.css']
})
export class PlotTabComponent implements OnInit {

  @Input() leftElements: IDbElement[];
  @Input() rightElements: IDbElement[];

  constructor() { }

  ngOnInit() {
  }

}
