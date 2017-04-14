import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  BsDropdownModule,
  ModalModule,
  TooltipModule
} from 'ngx-bootstrap'
import { SelectModule } from 'ng-select';
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
    BsDropdownModule.forRoot(),
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
