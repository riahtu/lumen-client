import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { 
  InstallationsPageComponent,
  InstallationPageComponent,
  HomePageComponent 
} from './pages';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { 
    path: 'home',
    component: HomePageComponent
  },
  { 
    path: 'installations',
    component: InstallationsPageComponent
  },
  {
    path: 'installations/:id', 
    component: InstallationPageComponent
  }
];

export const appRoutes: ModuleWithProviders =
  RouterModule.forRoot(routes);
