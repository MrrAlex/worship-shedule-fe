import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Rehearsal, RehearsalPlace } from '../../model/rehearsal.model';

@Component({
  selector: 'ws-add-rehearsal-modal',
  templateUrl: './add-rehearsal-modal.component.html',
  styleUrls: ['./add-rehearsal-modal.component.scss'],
})
export class AddRehearsalModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddRehearsalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
  ) {}

  rehearsalForm!: UntypedFormGroup;
  header!: string;
  places!: RehearsalPlace[];
  rehearsal?: Rehearsal;

  ngOnInit() {
    this.header = this.data.header;
    this.places = this.data.places;

    this.rehearsalForm = this.fb.group({
      date: this.fb.control(this.rehearsal?.date ?? null, Validators.required),
      placeId: this.fb.control(
        this.rehearsal?.place?._id ?? '',
        Validators.required,
      ),
    });
  }

  get place(): UntypedFormControl {
    return this.rehearsalForm.get('place') as UntypedFormControl;
  }

  get date(): UntypedFormControl {
    return this.rehearsalForm.get('date') as UntypedFormControl;
  }

  submit() {
    this.dialogRef.close(this.rehearsalForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}
