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
  NilmService,
  UserService
} from '../../../services';

import {
  INilm
} from '../../../store/data';

import {AccountService} from '../../account.service';
import { AccountSelectors } from '../../account.selectors';

@Component({
  selector: 'app-account-nilms',
  templateUrl: './nilms.component.html',
  styleUrls: ['./nilms.component.css']
})
export class NilmsComponent implements OnInit {
  @ViewChild('nilmModal', {static: false}) public nilmModal: ModalDirective;
  @select(['data','nilms']) nilms$: Observable<INilm[]>;

  public nilmArray$: Observable<INilm[]>;
  constructor(
    private nilmService: NilmService,
    private userService: UserService,
    public accountSelectors: AccountSelectors
  ) { }

  ngOnInit() {
    this.nilmService.loadNilms();   
    this.nilmArray$ = this.nilms$.pipe(
      map(nilms => _.sortBy(nilms,['name'])))
  }

  addNilm(){
    this.nilmModal.show()
    this.userService.requestInstallationToken()
  }

}