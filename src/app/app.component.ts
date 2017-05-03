import { Component } from '@angular/core';
import { createLogger } from 'redux-logger'
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { Angular2TokenService } from 'angular2-token';
import { createEpicMiddleware } from 'redux-observable';

import {AppEpics} from './epics';
import { environment } from '../environments/environment';

import {
  SessionService
} from './services';

import {
  IAppState,
  rootReducer
} from './app.store';

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
      createLogger({collapsed: true}),
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
      apiPath: environment.apiUrl,
      signInPath: 'auth/sign_in',
      signInRedirect: 'session/sign_in',
      signOutPath: 'auth/sign_out',
      resetPasswordCallback:  `${environment.appUrl}/session/reset_password`
    })

    sessionService.validateToken();
  }

}
