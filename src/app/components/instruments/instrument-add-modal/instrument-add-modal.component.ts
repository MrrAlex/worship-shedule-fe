import {Component, Inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Instrument} from '../../../models/instrument.model';

@Component({
  selector: 'ws-instrument-add-modal',
  templateUrl: './instrument-add-modal.component.html',
  styleUrls: ['./instrument-add-modal.component.scss'],
})
export class InstrumentAddModalComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<InstrumentAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  instrumentForm!: UntypedFormGroup;
  instrument!: Instrument;
  header = '';
  instrumentsNames!: string[];

  ngOnInit() {
    this.header = this.data.header;
    this.instrument = this.data.instrument;
    this.instrumentsNames = this.data.instrumentsNames;

    this.instrumentForm = this.fb.group({
      name: this.fb.control(this.instrument?.name ?? '', {
        validators: [Validators.required, this.uniqueInstrumentNameValidator()],
      }),
    });
  }

  get instrumentName() {
    return this.instrumentForm.get('name') as FormControl<string>;
  }

  save() {
    const value = this.instrument
      ? { ...this.instrument, ...this.instrumentForm.value }
      : this.instrumentForm.value;

    this.dialogRef.close(value);
  }

  close() {
    this.dialogRef.close();
  }

  private uniqueInstrumentNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isDuplicate = this.instrumentsNames.some(
        (item) =>
          item !== this.instrument?.name &&
          item.toLowerCase() === control.value.toLowerCase().trim(),
      );
      return isDuplicate ? { duplicate: true } : null;
    };
  }
}
