import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { Angular2TokenService} from 'angular2-token';
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { SERVICE_PROVIDERS } from './services';
import { EPIC_PROVIDERS } from './epics';

import {
  AlertModule,
  ProgressbarModule,
  ModalModule
} from 'ngx-bootstrap';

import { AccountModule } from './account/account.module';
import { InstallationModule } from './installation/installation.module';
import { ExplorerModule } from './explorer/explorer.module';

import {
  MessagesComponent,
  SessionComponent,
} from './components';

import {
  HomePageComponent,
  SignInPageComponent,
  PageNotFoundComponent,
  PasswordResetPageComponent
} from './pages';


import { ToArrayPipe } from './to-array.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ToArrayPipe,
    MessagesComponent,
    HomePageComponent,
    PageNotFoundComponent,
    SignInPageComponent,
    SessionComponent,
    PasswordResetPageComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    NgReduxModule,
    RouterModule,
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    AccountModule,
    InstallationModule,
    ExplorerModule,
    appRoutes
  ],
  providers: [
    [Angular2TokenService],
    SERVICE_PROVIDERS,
    EPIC_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
