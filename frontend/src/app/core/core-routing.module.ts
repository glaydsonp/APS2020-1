import { HomeModule } from './../modules/pages/home/home.module';
import { LoginModule } from './../modules/pages/login/login.module';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../modules/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'register',
    loadChildren: () => import('../modules/pages/register/register.module').then( m => m.RegisterModule)
  },
  {
    path: 'login',
    loadChildren: () => import('../modules/pages/login/login.module').then(m => m.LoginModule)
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
