import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { IAppState } from '../../app.store';
import {IStatusMessages} from '../../store/ui';

import { Observable } from 'rxjs';
import { select } from 'ng2-redux';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  
  @select(['ui','global','messages']) messages$: Observable<IStatusMessages>;

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {
  }

}
