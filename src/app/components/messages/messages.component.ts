import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import {
  IAppState,
  IStatusMessages
} from '../../store';

import { Observable } from 'rxjs';
import { select } from 'ng2-redux';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  
  @select(['page', 'messages']) messages$: Observable<IStatusMessages>;

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {
  }

}
