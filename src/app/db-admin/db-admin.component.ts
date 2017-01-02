import { Component, OnInit } from '@angular/core';
import { Nilm } from '../nilm';
import { NilmService } from '../nilm.service';
import { Observable } from 'rxjs';
import { select, NgRedux } from 'ng2-redux';

@Component({
  selector: 'app-db-admin',
  templateUrl: './db-admin.component.html',
  styleUrls: ['./db-admin.component.css']
})
export class DbAdminComponent implements OnInit {
  private nilms: Observable<Nilm[]>;
  @select(['counter', 'val']) val$: Observable<number>;
  constructor(
    private nilmService: NilmService,
    private ngRedux: NgRedux<any>
  ) {
    this.nilms = nilmService.nilms;

  }

  increment() {
    this.ngRedux.dispatch({ type: 'INCREMENT' });
  }
  decrement() {
    this.ngRedux.dispatch({ type: 'DECREMENT' });
  }
  ngOnInit() {
    this.nilmService.loadNilms();
  }

}
