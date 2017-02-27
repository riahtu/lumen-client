import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgReduxModule, NgRedux } from 'ng2-redux';

import { Angular2TokenService} from 'angular2-token';
import { TreeModule } from 'angular2-tree-component';
import { SelectModule } from 'angular2-select';
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { SERVICE_PROVIDERS } from './services';
import { EPIC_PROVIDERS } from './epics';

import { AccountModule } from './account/account.module';
import {
  AlertModule,
  ProgressbarModule,
  TabsModule,
  ModalModule
} from 'ng2-bootstrap';
import {
  EditDbComponent,
  EditFolderComponent,
  EditStreamComponent,
  MessagesComponent,
  SessionComponent,
  EditNilmComponent,
  EditPermissionsComponent,
  PermissionComponent
} from './components';

import {
  DbAdminPageComponent,
  InstallationAdminPageComponent,
  HomePageComponent,
  SignInPageComponent,
  InstallationsPageComponent,
  InstallationPageComponent,
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
    PasswordResetPageComponent,
    InstallationAdminPageComponent,
    EditNilmComponent,
    EditPermissionsComponent,
    PermissionComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    NgReduxModule,
    TreeModule,
    SelectModule,
    RouterModule,
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    AccountModule,
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
