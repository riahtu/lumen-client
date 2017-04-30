import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import {
  trigger, animate, style, transition
} from '@angular/animations';
import { ExplorerService } from '../../explorer.service'

import { IRange } from '../../store';

@Component({
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      /*transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])*/
    ])
  ],
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit, OnChanges {
  @Input() timeRange: IRange;

  public startDate: Date;
  public endDate: Date;
  public startTime: Date;
  public endTime: Date;
  public invalidRange: boolean;

  constructor(
    private explorerService: ExplorerService
  ) { 
    this.invalidRange = false;
  }

  ngOnInit() {
  }

  public setRange() {
    let range: IRange = {
      min: new Date(
        this.startDate.getFullYear(),
        this.startDate.getMonth(),
        this.startDate.getDate(),
        this.startTime.getHours(),
        this.startTime.getMinutes(),
        this.startTime.getSeconds(),
        this.startTime.getMilliseconds()
      ).getTime(),
      max: new Date(
        this.endDate.getFullYear(),
        this.endDate.getMonth(),
        this.endDate.getDate(),
        this.endTime.getHours(),
        this.endTime.getMinutes(),
        this.endTime.getSeconds(),
        this.endTime.getMilliseconds()
      ).getTime()
    }
    if(range.min>=range.max){
      this.invalidRange = true;
      return;
    }
    this.invalidRange = false;
    this.explorerService.setPlotTimeRange(range);
    this.explorerService.hideDateSelector();
  }
  public cancel(){
    this.invalidRange = false;
    this.explorerService.hideDateSelector();
  }

  ngOnChanges(
    changes: { [propName: string]: SimpleChange }
  ): void {
    if (changes['timeRange'] !== undefined) {
      this.startDate = new Date(changes['timeRange'].currentValue.min);
      this.endDate = new Date(changes['timeRange'].currentValue.max);
      this.startTime = new Date(this.startDate);
      this.endTime = new Date(this.endDate);
      this.invalidRange = false;
    }

  }

}
