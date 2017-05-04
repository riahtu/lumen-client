import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

import { AccountPageComponent } from './account/pages';
import { InstallationPageComponent } from './installation/pages';
import { ExplorerPageComponent } from './explorer/pages';
import {
  PageNotFoundComponent,
  HomePageComponent,
  SignInPageComponent,
  PasswordResetPageComponent
} from './pages';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'explorer',
    pathMatch: 'full',
    canActivate: [Angular2TokenService]
  },
  {
    path: 'explorer',
    component: ExplorerPageComponent,
    canActivate: [Angular2TokenService]
  },
  {
    path: 'account',
    component: AccountPageComponent,
    canActivate: [Angular2TokenService]
  },
  {
    path: 'installations/:id',
    component: InstallationPageComponent,
    canActivate: [Angular2TokenService]

  },
  {
    path: 'session/sign_in',
    component: SignInPageComponent
  },
  {
    path: 'session/reset_password',
    component: PasswordResetPageComponent
  },
  {
    path: '**',
    redirectTo: 'explorer',
    //component: PageNotFoundComponent
  },

];

export const appRoutes: ModuleWithProviders =
  RouterModule.forRoot(routes);
