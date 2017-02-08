import { Component } from '@angular/core';
import * as createLogger from 'redux-logger';
import { NgReduxModule, NgRedux, DevToolsExtension } from 'ng2-redux';
import { Angular2TokenService } from 'angular2-token';
import { createEpicMiddleware } from 'redux-observable';

import {AppEpics} from './epics';

import {
  SessionService
} from './services';

import {
  rootReducer,
  IAppState
} from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTools: DevToolsExtension,
    private epics: AppEpics,
    private tokenService: Angular2TokenService,
    private sessionService: SessionService
  ) {

    //configure redux
    const middleware = [
      createLogger(),
      createEpicMiddleware(this.epics.root)
    ]
    

    ngRedux.configureStore(rootReducer,
      {},
      middleware,
      devTools.isEnabled() ?
        [devTools.enhancer()] : 
        []
    );
    
    //configure angular2-token
    tokenService.init({
      apiPath: 'http://localhost:3000',
      signInPath: 'auth/sign_in',
      signInRedirect: 'session/sign_in',
      signOutPath: 'auth/sign_out',
      resetPasswordCallback:  'http://localhost:4200/session/reset_password'
    })

    sessionService.validateToken();
  }

}
