import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import {IAppState} from '../../app.store';
import { INilmRecords } from '../../store/data';

import {
  NilmService,
} from '../../services/api';

import { Observable } from 'rxjs';
import { select } from 'ng2-redux';

@Component({
  selector: 'app-installations',
  templateUrl: './installations.page.html',
  styleUrls: ['./installations.page.css']
})
export class InstallationsPageComponent implements OnInit {

  @select(['data', 'nilms', 'entities']) nilms$: Observable<INilmRecords>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private nilmService: NilmService
  ) { }

  ngOnInit() {
    this.loadNilms();
  }

  // ---loadNilms: request nilms-----
  private loadNilms() {
    this.nilmService.loadNilms();
  }
}
