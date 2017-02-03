import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgReduxModule, NgRedux } from 'ng2-redux';


import { TreeModule } from 'angular2-tree-component';

import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { SERVICE_PROVIDERS } from './services';

import {
  AlertModule,
  ProgressbarModule,
  TabsModule
} from 'ng2-bootstrap';
import {
  EditDbComponent,
  EditFolderComponent,
  EditStreamComponent,
  MessagesComponent
} from './components';

import {
  DbAdminPageComponent,
  HomePageComponent,
  InstallationsPageComponent,
  InstallationPageComponent
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
    MessagesComponent,
    EditDbComponent,
    HomePageComponent,
    InstallationsPageComponent,
    InstallationPageComponent,
    ToArrayPipe,
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
    SERVICE_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
