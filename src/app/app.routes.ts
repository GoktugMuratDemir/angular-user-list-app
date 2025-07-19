import { Routes } from '@angular/router';
import { UserListComponent, UserDetailComponent } from './features';

export const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: '**', redirectTo: '' }
];
