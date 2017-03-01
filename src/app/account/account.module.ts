import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  DropdownModule,
  ModalModule,
  TooltipModule
} from 'ng2-bootstrap'
import { SelectModule } from 'angular2-select';
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
  GroupFormComponent,
  NilmsComponent,
  NilmFormComponent
} from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SelectModule,
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [
    GroupsComponent,
    NilmsComponent,
    AccountPageComponent,
    GroupComponent,
    GroupFormComponent,
    NilmFormComponent
  ],
  exports: [
    AccountPageComponent
  ]
})
export class AccountModule { }
