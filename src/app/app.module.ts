import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgReduxModule, NgRedux, DevToolsExtension } from 'ng2-redux';
import * as createLogger from 'redux-logger';
import { AppComponent } from './app.component';
import { DbAdminComponent } from './db-admin/db-admin.component';
import { NilmService } from './nilm.service';

import { rootReducer } from './store';
import { Nilm } from './nilm';

interface IAppState {
  nilms: Nilm[];
}


@NgModule({
  declarations: [
    AppComponent,
    DbAdminComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule
  ],
  providers: [
    NilmService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<any>,
    private devTools: DevToolsExtension
  ) {


    ngRedux.configureStore(rootReducer,
      {},
      [createLogger()],
      [devTools.enhancer()]);

  }
}
