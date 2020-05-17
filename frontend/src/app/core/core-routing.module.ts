import { HomeModule } from './../modules/pages/home/home.module';
import { LoginModule } from './../modules/pages/login/login.module';

import { OnlyAuthenticatedGuard } from './guards/only-authenticated.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlyLoggedOffGuard } from './guards/only-logged-off.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../modules/pages/home/home.module').then(m => m.HomeModule),
    canActivate: [OnlyAuthenticatedGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('../modules/pages/register/register.module').then(m => m.RegisterModule),
    canActivate: [OnlyLoggedOffGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('../modules/pages/login/login.module').then(m => m.LoginModule),
    canActivate: [OnlyLoggedOffGuard],
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('../modules/pages/forgotPassword/forgotPassword.module').then(m => m.ForgotPasswordModule),
    canActivate: [OnlyLoggedOffGuard],
  },


  {
    path: '**', redirectTo: ''

  }
  // {
  //   path: 'produtos',
  //   loadChildren: () => import('../category/category.module').then( m => m.CategoryModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
