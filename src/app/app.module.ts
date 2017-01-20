import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgReduxModule, NgRedux} from 'ng2-redux';


import { TreeModule } from 'angular2-tree-component';

import { AppComponent } from './app.component';
import { SERVICE_PROVIDERS } from './services';

import {
  AlertModule,
  ProgressbarModule } from 'ng2-bootstrap';
import {
  EditFolderComponent,
  EditStreamComponent } from './components';

import {
  DbAdminPageComponent
} from './pages';
import { ByteSizePipe } from './byte-size.pipe';
import { DurationPipe } from './duration.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DbAdminPageComponent,
    EditFolderComponent,
    EditStreamComponent,
    ByteSizePipe,
    DurationPipe,
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
    SERVICE_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
