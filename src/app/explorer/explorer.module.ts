import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TooltipModule,
  TabsModule,
  ModalModule,
  BsDropdownModule
} from 'ngx-bootstrap';
import {
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

import { SelectModule } from 'ng-select';

import { COMPONENTS } from './components';
import { ExplorerPageComponent } from './pages/explorer/explorer.page';
import { ExplorerService } from './explorer.service';
import { ExplorerSelectors } from './explorer.selectors';
import { TreeModule } from 'angular-tree-component';
import { NavPlotComponent } from './components/nav-plot/nav-plot.component';
import { ToolTabComponent } from './components/tool-tab/tool-tab.component';

@NgModule({
  imports: [
    CommonModule,
    TreeModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SelectModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  declarations: [
    COMPONENTS,
    ExplorerPageComponent, NavPlotComponent, ToolTabComponent
  ],
  providers: [
    ExplorerService,
    ExplorerSelectors
  ],
  exports: [
    ExplorerPageComponent
  ]
})
export class ExplorerModule { }
