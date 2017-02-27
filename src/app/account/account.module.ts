import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'ng2-bootstrap/dropdown'
import {
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

import {
  AccountPageComponent
} from './pages';

import {
  GroupsComponent,
  GroupComponent,
  NilmsComponent
} from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DropdownModule.forRoot()
  ],
  declarations: [
    GroupsComponent,
    NilmsComponent,
    AccountPageComponent,
    GroupComponent
  ],
  exports: [
    AccountPageComponent
  ]
})
export class AccountModule { }
