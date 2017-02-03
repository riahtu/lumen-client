import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { 
  DbAdminPageComponent,
  InstallationsPageComponent,
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
  }
];

export const appRoutes: ModuleWithProviders =
  RouterModule.forRoot(routes);
