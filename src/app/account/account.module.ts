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

import {SharedModule} from '../shared/shared.module';
import {
  AccountPageComponent
} from './pages';
import { COMPONENTS } from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SelectModule,
    SharedModule,
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [
    COMPONENTS,
    AccountPageComponent,
  ],
  exports: [
    AccountPageComponent
  ]
})
export class AccountModule { }
