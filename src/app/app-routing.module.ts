import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { IsAuthenticatedGuard } from './core/guards/is-authenticated.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login', 
    loadChildren: () => 
      import('./modules/login/login.module').
    then(
      (m) => m.LoginModule
    ),
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    loadChildren: () => 
      import('./modules/register-user-client/register-user-client.module').
    then(
      (m) => m.RegisterUserClientModule
    )
  },
  {
    path: 'dashboard', 
    loadChildren: () => 
      import('./modules/dashboard/dashboard.module')
    .then(
      (m) => m.DashboardModule
    ),
    canActivate: [IsAuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
