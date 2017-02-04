import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import {Angular2TokenService } from 'angular2-token';

import { 
  InstallationsPageComponent,
  InstallationPageComponent,
  HomePageComponent,
  SignInPageComponent
} from './pages';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [Angular2TokenService]
  },
  { 
    path: 'home',
    component: HomePageComponent,
    canActivate: [Angular2TokenService]
  },
  { 
    path: 'installations',
    component: InstallationsPageComponent,
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
  }
];

export const appRoutes: ModuleWithProviders =
  RouterModule.forRoot(routes);
