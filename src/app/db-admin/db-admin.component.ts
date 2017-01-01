import { Component, OnInit } from '@angular/core';
import { Nilm } from '../nilm';
import { NilmService } from '../nilm.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-db-admin',
  templateUrl: './db-admin.component.html',
  styleUrls: ['./db-admin.component.css']
})
export class DbAdminComponent implements OnInit {
  private nilms: Observable<Nilm[]>;

  constructor(
    private nilmService: NilmService
  ) {
    this.nilms = nilmService.nilms;

  }


  ngOnInit() {
    this.nilmService.loadNilms();
  }

}
