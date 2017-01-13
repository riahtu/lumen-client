import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgReduxModule, NgRedux} from 'ng2-redux';


import { TreeModule } from 'angular2-tree-component';

import { AppComponent } from './app.component';
import { ACTION_PROVIDERS } from './actions';

import {
  AlertModule,
  ProgressbarModule } from 'ng2-bootstrap';
import {
  EditFolderComponent,
  EditStreamComponent } from './components';

import {
  DbAdminPageComponent
} from './pages';

@NgModule({
  declarations: [
    AppComponent,
    DbAdminPageComponent,
    EditFolderComponent,
    EditStreamComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    NgReduxModule,
    TreeModule,
    AlertModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  providers: [
    ACTION_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
