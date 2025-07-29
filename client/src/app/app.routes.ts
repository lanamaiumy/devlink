import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LinkListComponent } from './pages/link-list/link-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'links', component: LinkListComponent },
  { path: '**', redirectTo: '' }
];