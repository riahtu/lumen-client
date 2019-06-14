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
import { NgSelectModule } from '@ng-select/ng-select';
import {
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSpinner,
  faLifeRing,
  faHome,
  faEdit,
  faTimes,
  faBars,
  faCog,
  faCircle,
  faPlus,
  faEye,
  faUser,
  faUserShield
} from '@fortawesome/free-solid-svg-icons'

import { AccountSelectors } from './account.selectors';
import { AccountService } from './account.service';

import { SharedModule } from '../shared/shared.module';
import { PAGES } from './pages';
import { COMPONENTS } from './components';

library.add(faSpinner);
library.add(faLifeRing);
library.add(faHome);
library.add(faTimes);
library.add(faEdit);
library.add(faBars);
library.add(faCog);
library.add(faCircle);
library.add(faPlus);
library.add(faEye);
library.add(faUser);
library.add(faUserShield);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgSelectModule,
    SharedModule,
    FontAwesomeModule,
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
