import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgRedux } from 'ng2-redux';

import { Observable } from 'rxjs';
import { select } from 'ng2-redux';

import {
  NilmService,
  parseErrors
} from '../../services/api';

import {
  IAppState,
  IStatusMessages,
  INilmRecords,
  INilmRecord,
  PageActions
} from '../../store';


@Component({
  selector: 'app-installation',
  templateUrl: './installation.page.html',
  styleUrls: ['./installation.page.css']
})
export class InstallationPageComponent implements OnInit {

  @select(['page', 'messages']) messages$: Observable<IStatusMessages>;
  @select(['data', 'nilms']) nilms$: Observable<INilmRecords>;
  
  public nilm$: Observable<INilmRecord>
  public dbId$: Observable<number>

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private route: ActivatedRoute,
    private nilmService: NilmService
  ) { 
    route.params.subscribe(params => { 
      if(!(params['id'] in ngRedux.getState().data.nilms)){
        this.nilmService.loadNilm(params['id'])
          .subscribe(null, error=> {
            this.ngRedux.dispatch({
            type: PageActions.SET_MESSAGES,
            payload: parseErrors(error)
          })
        })
      }
    });

    this.nilm$ = this.nilms$
                    .combineLatest(route.params)
                    
                    .map(([nilms,params]) => nilms[params['id']])
                    .filter(nilm => !(nilm === undefined))

    this.dbId$ = this.nilm$
                    .map(nilm => nilm.db)
  }

  ngOnInit() {
  }

}
