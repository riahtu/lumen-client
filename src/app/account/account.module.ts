import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  BsDropdownModule,
  ModalModule,
  TooltipModule,
  PopoverModule,
  CarouselModule
} from 'ngx-bootstrap'
import { SelectModule } from 'ng-select';
import {
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import {AccountSelectors} from './account.selectors';
import {AccountService} from './account.service';

import {SharedModule} from '../shared/shared.module';
import { PAGES } from './pages';
import { COMPONENTS } from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SelectModule,
    SharedModule,
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    CarouselModule.forRoot()
  ],
  declarations: [
    COMPONENTS,
    PAGES,
  ],
  providers: [
    AccountService,
    AccountSelectors
  ],
  exports: [
    PAGES
  ]
})
export class AccountModule { }
