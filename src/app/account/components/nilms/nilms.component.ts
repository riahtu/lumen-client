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
  INilmStore,
  INilm
} from '../../../store/data';

@Component({
  selector: 'app-account-nilms',
  templateUrl: './nilms.component.html',
  styleUrls: ['./nilms.component.css']
})
export class NilmsComponent implements OnInit {
  @ViewChild('nilmModal') public nilmModal: ModalDirective;
  @select(['data','nilms']) nilmStore$: Observable<INilmStore>;
  public nilms$: Observable<INilmWithRole[]>

  constructor(
    private nilmService: NilmService
  ) { }

  ngOnInit() {
    this.nilmService.loadNilms();

    //combine all nilms into a flat array of INilmWithRole objects
    this.nilms$ = this.nilmStore$.map(store =>{
      return store.admin.map(id=> {
        return <INilmWithRole>Object.assign({},store.entities[id].toJS(),{role: 'admin'})
      }).concat(
      store.owner.map(id=> {
        return <INilmWithRole>Object.assign({},store.entities[id].toJS(),{role: 'owner'})
      }),
      store.viewer.map(id=> {
        return <INilmWithRole>Object.assign({},store.entities[id].toJS(),{role: 'viewer'})
      })
      ).sort((a,b)=>{ 
        return a.name == b.name ? 0 : +(a.name > b.name) || -1;
      });
    })
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

interface INilmWithRole extends INilm{
  role: string;
}