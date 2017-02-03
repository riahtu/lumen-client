import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import {
  IAppState,
  IStatusMessages,
  INilmRecords,
  PageActions
} from '../../store';

import {
  NilmService,
  parseErrors
} from '../../services/api';

import { Observable } from 'rxjs';
import { select } from 'ng2-redux';

@Component({
  selector: 'app-installations',
  templateUrl: './installations.page.html',
  styleUrls: ['./installations.page.css']
})
export class InstallationsPageComponent implements OnInit {

  @select(['data', 'nilms']) nilms$: Observable<INilmRecords>;
  @select(['page', 'messages']) messages$: Observable<IStatusMessages>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private nilmService: NilmService
  ) { }

  ngOnInit() {
    this.loadNilms();
  }

  // ---loadNilms: request nilms-----
  private loadNilms() {
    this.nilmService.loadNilms()
      .subscribe(success => { }, error => {
        this.ngRedux.dispatch({
          type: PageActions.SET_MESSAGES,
          payload: parseErrors(error)
        })
      })
  }
}
