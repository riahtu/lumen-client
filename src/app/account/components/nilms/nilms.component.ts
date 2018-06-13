import { 
  Component,
  ViewChild,
  OnInit 
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { select } from '@angular-redux/store';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';

import {
  NilmService
} from '../../../services';

import {
  INilm
} from '../../../store/data';

import {AccountService} from '../../account.service';

@Component({
  selector: 'app-account-nilms',
  templateUrl: './nilms.component.html',
  styleUrls: ['./nilms.component.css']
})
export class NilmsComponent implements OnInit {
  @ViewChild('nilmModal') public nilmModal: ModalDirective;
  @select(['data','nilms']) nilms$: Observable<INilm[]>;

  public nilmArray$: Observable<INilm[]>;
  constructor(
    private nilmService: NilmService,
  ) { }

  ngOnInit() {
    this.nilmService.loadNilms();   
    this.nilmArray$ = this.nilms$.pipe(
      map(nilms => _.sortBy(nilms,['name'])))
  }

  createNilm(values: any){
    this.nilmService
      .createNilm(
        values.name, 
        values.description, 
        values.url)
      .subscribe(result => this.nilmModal.hide())
  }

}