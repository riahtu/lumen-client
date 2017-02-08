import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgReduxModule, NgRedux } from 'ng2-redux';

import { Angular2TokenService} from 'angular2-token';
import { TreeModule } from 'angular2-tree-component';

import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { SERVICE_PROVIDERS } from './services';
import { EPIC_PROVIDERS } from './epics';

import {
  AlertModule,
  ProgressbarModule,
  TabsModule
} from 'ng2-bootstrap';
import {
  EditDbComponent,
  EditFolderComponent,
  EditStreamComponent,
  MessagesComponent,
  SessionComponent
} from './components';

import {
  DbAdminPageComponent,
  HomePageComponent,
  SignInPageComponent,
  InstallationsPageComponent,
  InstallationPageComponent,
  AccountPageComponent,
  PasswordResetPageComponent
} from './pages';

import { ByteSizePipe } from './byte-size.pipe';
import { DurationPipe } from './duration.pipe';
import { ToArrayPipe } from './to-array.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DbAdminPageComponent,
    EditFolderComponent,
    EditStreamComponent,
    ByteSizePipe,
    DurationPipe,
    ToArrayPipe,
    MessagesComponent,
    EditDbComponent,
    HomePageComponent,
    InstallationsPageComponent,
    InstallationPageComponent,
    SignInPageComponent,
    SessionComponent,
    AccountPageComponent,
    PasswordResetPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    NgReduxModule,
    TreeModule,
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
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
