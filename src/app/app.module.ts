import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DbAdminComponent } from './db-admin/db-admin.component';
import { NilmService } from './nilm.service';

@NgModule({
  declarations: [
    AppComponent,
    DbAdminComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    NilmService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
