import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [LoadingIndicatorComponent, ConfirmDialogComponent],
  exports: [LoadingIndicatorComponent, ConfirmDialogComponent],
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule],
})
export class SharedModule {}
