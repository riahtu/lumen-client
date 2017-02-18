import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgRedux } from 'ng2-redux';

import { Observable } from 'rxjs';
import { select } from 'ng2-redux';

import {
  NilmService,
} from '../../services/api';

import {
  IAppState,
  IStatusMessages,
  INilmRecords,
  INilmRecord,
  IDbRecord,
  IDbRecords,
  PageActions
} from '../../store';


@Component({
  selector: 'app-installation',
  templateUrl: './installation.page.html',
  styleUrls: ['./installation.page.css']
})
export class InstallationPageComponent implements OnInit {

  @select(['page', 'messages']) messages$: Observable<IStatusMessages>;
  @select(['data', 'nilms', 'entities']) nilms$: Observable<INilmRecords>;

  public nilm$: Observable<INilmRecord>

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private route: ActivatedRoute,
    private nilmService: NilmService
  ) {
    route.params.subscribe(params => {
      if (!(params['id'] in ngRedux.getState().data.nilms.entities)) {
        this.nilmService.loadNilm(params['id'])
      }
    });

    this.nilm$ = this.nilms$
      .combineLatest(route.params)

      .map(([nilms, params]) => nilms[params['id']])
      .filter(nilm => !(nilm === undefined))

   
  }

  ngOnInit() {
  }

}
