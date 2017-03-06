import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs';
import { select } from 'ng2-redux';
import { IUserRecord } from '../../store/data';
import {IAppState} from '../../app.store';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  @select(['data', 'users', 'current']) userId$: Observable<number>;

  constructor(
    private tokenService: Angular2TokenService
  ) { }

  ngOnInit() {
  }


  public logout(){
    this.tokenService.signOut();
  }
}
