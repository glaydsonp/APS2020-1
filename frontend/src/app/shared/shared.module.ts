import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPopover, NgbPopoverModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { MatProgressSpinnerModule } from '@angular/material';



@NgModule({
  declarations: [
    LoadingOverlayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPopoverModule,
    NgbModalModule,
    MatProgressSpinnerModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgbPopoverModule,
    NgbModalModule,
    LoadingOverlayComponent
  ]
})
export class SharedModule { }
