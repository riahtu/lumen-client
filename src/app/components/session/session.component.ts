import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { IUserRecord } from '../../store/data';
import {IAppState} from '../../app.store';
import {SessionService} from '../../services';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  @select(['data', 'users', 'current']) userId$: Observable<number>;

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit() {
  }


  public logout(){
    this.sessionService.logout();
  }
}
