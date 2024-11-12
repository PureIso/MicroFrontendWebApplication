import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { HomeComponent } from './features/home/components/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'remoteFrontendWebApplication',
    loadComponent: () =>
      loadRemoteModule('remoteFrontendWebApplication','./DashboardComponent')
    .then((m) => m.DashboardComponent),
  },
  { path: '**', component: HomeComponent },
  // Add other routes here
];