import { SharedModule } from './../../../shared/shared.module';
import { ForgotPasswordRoutingModule } from './forgotPassword-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgotPassword.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ForgotPasswordRoutingModule
  ],
  declarations: [ForgotPasswordComponent],
  exports:[ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
