import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    LoginModule,
    RegisterModule

  ],
  declarations: [],
  exports:[
    CommonModule,
    HomeModule,
    LoginModule,
    RegisterModule]
})
export class PagesModule { }
