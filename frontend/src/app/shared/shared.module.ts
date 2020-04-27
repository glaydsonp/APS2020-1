import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPopover, NgbPopoverModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPopoverModule,
    NgbModalModule,

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgbPopoverModule,
    NgbModalModule,
  ]
})
export class SharedModule { }
