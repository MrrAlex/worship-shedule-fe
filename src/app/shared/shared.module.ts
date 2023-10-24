import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [LoadingIndicatorComponent, ConfirmDialogComponent],
  exports: [LoadingIndicatorComponent, ConfirmDialogComponent],
  imports: [CommonModule],
})
export class SharedModule {}
