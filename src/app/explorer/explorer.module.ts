import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TooltipModule,
  TabsModule,
  ModalModule,
  BsDropdownModule,
  DatepickerModule,
  TimepickerModule
} from 'ngx-bootstrap';
import {
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

import { SelectModule } from 'ng-select';

import { SharedModule } from '../shared/shared.module';
import { COMPONENTS } from './components';
import { ExplorerPageComponent } from './pages/explorer/explorer.page';
import { ExplorerService } from './explorer.service';
import { ExplorerSelectors } from './explorer.selectors';
import { TreeModule } from 'angular-tree-component';
import { DurationPipe } from './duration.pipe';
import { LoadDataViewComponent } from './components/load-data-view/load-data-view.component';

@NgModule({
  imports: [
    CommonModule,
    TreeModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SelectModule,
    SharedModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  declarations: [
    COMPONENTS,
    ExplorerPageComponent,
    DurationPipe,
    LoadDataViewComponent
  ],
  providers: [
    ExplorerService,
    ExplorerSelectors,
    DatePipe
  ],
  exports: [
    ExplorerPageComponent
  ]
})
export class ExplorerModule { }
