import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';

import {
  NilmService
} from '../../../services';

import {
  INilmStore,
  INilm
} from '../../../store';

@Component({
  selector: 'app-account-nilms',
  templateUrl: './nilms.component.html',
  styleUrls: ['./nilms.component.css']
})
export class NilmsComponent implements OnInit {

  @select(['data','nilms']) nilmStore$: Observable<INilmStore>;
  private managedNilms$: Observable<INilm[]>
  private viewedNilms$: Observable<INilm[]>

  constructor(
    private nilmService: NilmService
  ) { }

  ngOnInit() {
    this.nilmService.loadNilms();
    
    //nilms with admin or owner permissions
    this.managedNilms$ = this.nilmStore$.map(store => 
      store.admin.map(id => store.entities[id]).concat(
      store.owner.map(id => store.entities[id])));
    //nilms with viewer permissions
    this.viewedNilms$ = this.nilmStore$.map(store => 
      store.viewer.map(id=>store.entities[id]));
  }

}
