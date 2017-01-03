import { Component, OnInit } from '@angular/core';
import { Nilm } from '../nilm';
import { NilmService } from '../nilm.service';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';

@Component({
  selector: 'app-db-admin',
  templateUrl: './db-admin.component.html',
  styleUrls: ['./db-admin.component.css']
})
export class DbAdminComponent implements OnInit {
  @select(['nilmReducer', 'nilms']) nilms$: Observable<Nilm[]>;

  constructor(
    private nilmService: NilmService,
  ) { }
  ngOnInit() {
    this.nilmService.loadNilms();
  }

}
