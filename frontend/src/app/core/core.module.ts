import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
// import { NgProgressModule } from 'ngx-progressbar';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './main/footer/footer.component';
import { NavbarMainComponent } from './main/navbar-main/navbar-main.component';
import { NavbarMenuComponent } from './main/navbar-menu/navbar-menu.component';
import { SearchBarComponent } from './main/search-bar/search-bar.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    MainComponent,
    FooterComponent,
    NavbarMainComponent,
    NavbarMenuComponent,
    SearchBarComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    // NgProgressModule,
    SharedModule,
  ],
  exports: [
    MainComponent
  ]
})
export class CoreModule { }
