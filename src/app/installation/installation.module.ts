import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { 
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { TreeModule } from 'angular-tree-component';
import { 
  AlertModule,
  ModalModule,
  TabsModule,
  TooltipModule
 } from 'ngx-bootstrap';
 import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
 import { library } from '@fortawesome/fontawesome-svg-core';
 import {
   faSpinner,
   faLifeRing,
   faSync,
   faExclamationTriangle,
   faUserPlus,
   faUser,
   faUsers,
   faFolder,
   faFolderOpen,
   faDatabase
 } from '@fortawesome/pro-solid-svg-icons'

import { COMPONENTS } from './components';
import { TABS } from './tabs';
import { PIPES } from './pipes';
import { InstallationPageComponent } from './pages';
import { InstallationService } from './installation.service'
import { InstallationSelectors } from './installation.selectors';
import { SharedModule } from '../shared/shared.module';
import { EditModuleComponent } from './components/edit-module/edit-module.component';

library.add(faSpinner);
library.add(faLifeRing);
library.add(faSync);
library.add(faExclamationTriangle);
library.add(faUserPlus);
library.add(faUser);
library.add(faUsers);
library.add(faFolder);
library.add(faDatabase);

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TreeModule,
    NgSelectModule,
    SharedModule,
    FontAwesomeModule,
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    COMPONENTS,
    TABS,
    PIPES,
    InstallationPageComponent,
    EditModuleComponent
  ],
  providers: [
    InstallationService,
    InstallationSelectors
  ],
  exports: [
    InstallationPageComponent
  ]
})
export class InstallationModule { }
