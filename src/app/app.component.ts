import { Component } from '@angular/core';
import * as createLogger from 'redux-logger';
import { NgReduxModule, NgRedux, DevToolsExtension } from 'ng2-redux';

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
    private devTools: DevToolsExtension
  ) {


    ngRedux.configureStore(rootReducer,
      {},
      [createLogger()],
      [devTools.enhancer()]);

  }
}
