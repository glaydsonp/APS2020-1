import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { MatCardModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RegisterRoutingModule,
    MatCardModule,
    MatFormFieldModule
  ],

  declarations: [RegisterComponent],

  exports: [RegisterComponent]
})
export class RegisterModule { }
