import {Component, Inject} from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'ws-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
  ) {}

  save() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}
