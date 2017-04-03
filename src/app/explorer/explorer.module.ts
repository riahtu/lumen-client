import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  TooltipModule,
  TabsModule,
  ModalModule
} from 'ng2-bootstrap';

import { COMPONENTS } from './components';
import { ExplorerPageComponent } from './pages/explorer/explorer.page';
import { ExplorerService } from './explorer.service';
import { ExplorerSelectors } from './explorer.selectors';
import { TreeModule } from 'angular2-tree-component';
import { NavPlotComponent } from './components/nav-plot/nav-plot.component';
import { ToolTabComponent } from './components/tool-tab/tool-tab.component';

@NgModule({
  imports: [
    CommonModule,
    TreeModule,
    RouterModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot()
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
