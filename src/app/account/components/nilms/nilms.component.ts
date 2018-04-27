import { 
  Component,
  ViewChild,
  OnInit 
} from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { ModalDirective } from 'ngx-bootstrap/modal';

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
  public sortedNilms$: Observable<INilm[]>

  constructor(
    private nilmService: NilmService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    //sort the nilms alphabetically    
    this.sortedNilms$ = this.nilms$.map(nilms => {
      return nilms.sort((a,b)=>{ 
        return a.name == b.name ? 0 : +(a.name > b.name) || -1;
      })
    });
    
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