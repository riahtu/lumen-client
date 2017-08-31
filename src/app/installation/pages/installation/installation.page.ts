import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import {environment } from '../../../../environments/environment'
import {
  NilmService,
} from '../../../services';

import {
  INilmStore,
  INilm
} from '../../../store/data';

import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.page.html',
  styleUrls: ['./installation.page.css']
})
export class InstallationPageComponent implements OnInit {

  @select(['data', 'nilms']) nilmStore$: Observable<INilmStore>;

  public nilm$: Observable<INilm>
  public role$: Observable<string>
  public helpUrl: string;

  constructor(
    private route: ActivatedRoute,
    private nilmService: NilmService
  ) {
    this.helpUrl = environment.helpUrl;
    
    this.nilmService.loadNilms();

    this.nilm$ = this.nilmStore$
      .combineLatest(route.params)
      .map(([store, params]) => store.entities[params['id']])
      .filter(nilm => !(nilm === undefined))

    this.role$ = this.nilmStore$
      .combineLatest(route.params)
      .map(([store,params]) => {
        //figure out the role for this nilm
        if(store.admin.indexOf(+params['id'])!=-1){
          return 'admin'
        } else if(store.owner.indexOf(+params['id'])!=-1) {
          return 'owner'
        } else {
          return 'viewer'
        }
      })
  }

  ngOnInit() {
  }

  @ViewChild('childModal') public childModal:ModalDirective;
 
  public showChildModal():void {
    this.childModal.show();
  }
 
  public hideChildModal():void {
    this.childModal.hide();
  }

}
