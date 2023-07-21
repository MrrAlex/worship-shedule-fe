import { Component, Inject } from '@angular/core';
import {
  FormControl,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ServiceTemplate,
  TemplateInstrumentConfig,
} from '../../../models/service-template.model';
import { Instrument } from '../../../models/instrument.model';
import { Person } from '../../../models/people.model';

@Component({
  selector: 'ws-add-people-modal',
  templateUrl: './add-people-modal.component.html',
  styleUrls: ['./add-people-modal.component.scss'],
})
export class AddPeopleModalComponent {
  constructor(
    private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<AddPeopleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  personForm!: UntypedFormGroup;
  person!: Person;
  availableInstruments!: Instrument[];
  header = '';

  ngOnInit() {
    this.header = this.data.header;
    this.availableInstruments = this.data.instruments;
    this.person = this.data.person;

    this.personForm = this.fb.group({
      name: this.fb.control(this.person?.name ?? '', {
        validators: [Validators.required],
      }),
      instruments: this.fb.array(
        this.availableInstruments.map((i) =>
          this.fb.control(
            this.person ? this.person.instruments.includes(i._id) : false,
          ),
        ),
      ),
    });
  }

  get personName() {
    return this.personForm.get('name') as FormControl<string>;
  }

  get instruments() {
    return this.personForm.get('instruments') as UntypedFormArray;
  }

  instrumentControlByIndex(i: number) {
    return this.instruments.at(i) as UntypedFormControl;
  }

  save() {
    const value = this.person
      ? { ...this.person, ...this.personForm.value }
      : this.personForm.value;

    const instruments = this.availableInstruments
      .filter((i, index) => value.instruments[index])
      .map((i) => i._id);

    this.dialogRef.close({ ...value, instruments });
  }

  close() {
    this.dialogRef.close();
  }
}
