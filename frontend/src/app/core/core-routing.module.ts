import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../home/home.module').then( m => m.HomeModule)
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
