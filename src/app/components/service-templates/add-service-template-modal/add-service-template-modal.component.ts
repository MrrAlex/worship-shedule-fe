import {Component, Inject} from '@angular/core';
import {
  FormControl,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Instrument} from "../../../models/instrument.model";
import {ServiceTemplate, TemplateInstrumentConfig} from "../../../models/service-template.model";

@Component({
  selector: 'ws-add-service-template-modal',
  templateUrl: './add-service-template-modal.component.html',
  styleUrls: ['./add-service-template-modal.component.scss']
})
export class AddServiceTemplateModalComponent {
  constructor(
    private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<AddServiceTemplateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  templateForm!: UntypedFormGroup;
  template!: ServiceTemplate;
  availableInstruments!: Instrument[]
  header = '';
  instrumentNames: string[] = [];
  instrumentOptions!: Instrument[];

  ngOnInit() {
    this.header = this.data.header;
    this.availableInstruments = this.data.instruments;
    this.template = this.data.template;
    if (this.template) {
      const presentInstruments = this.data.template.instruments.map((i: TemplateInstrumentConfig) => i.instrument)
      this.instrumentOptions = this.availableInstruments.filter(i => !presentInstruments.includes(i.name))
    } else {
      this.instrumentOptions = this.availableInstruments;
    }

    this.templateForm = this.fb.group({
      name: this.fb.control(this.template?.name ?? '', {
        validators: [Validators.required],
      }),
      description: this.fb.control(this.template?.description ?? '', {
        validators: [Validators.required],
      }),
      instruments: this.fb.array(this.template ? this.template.instruments.map((i, index) => {
        this.instrumentNames[index] = i.instrument
        return this.fb.group({
          instrument: i.id,
          members: this.fb.control(i.members, {validators: [Validators.required, Validators.min(1)]})
        })
      }) : [], {validators: [Validators.required]})
    });
  }

  get templateName() {
    return this.templateForm.get('name') as FormControl<string>;
  }

  get templateDescription() {
    return this.templateForm.get('description') as FormControl<string>;
  }

  get instruments() {
    return this.templateForm.get('instruments') as UntypedFormArray;
  }

  get instrumentControls() {
    return (this.templateForm.get('instruments') as UntypedFormArray).controls as UntypedFormControl[];
  }

  instrumentMembers(control: FormControl) {
    return control.get('members') as FormControl<number>
  }

  instrumentMembersHasErrors(control: FormControl) {
    const members = this.instrumentMembers(control);
    return members.hasError('required') || members.hasError('min')
  }

  save() {
    const value = this.template
      ? { ...this.template, ...this.templateForm.value }
      : this.templateForm.value;

    this.dialogRef.close(value);
  }

  close() {
    this.dialogRef.close();
  }

  addInstrumentToTemplate(selected: string) {
    let instrumentName = '';
    this.instrumentOptions = this.instrumentOptions.filter(i => {
      if (i._id === selected) {
        instrumentName = i.name;
        return false;
      }
      return true;
    })

    this.instruments.push(this.fb.group({
      instrument: selected,
      members: this.fb.control(1, {validators: [Validators.required, Validators.min(1)]})
    }))
    this.instrumentNames[this.instruments.length - 1] = instrumentName;
  }

  removeInstrument(i: number) {
    const instrumentValue = this.instruments.at(i).value;
    this.instruments.removeAt(i);
    this.instrumentNames = this.instrumentNames.filter((instr, index) => index !== i);
    const instrument = this.availableInstruments.find(instrument => instrument._id === instrumentValue.instrument);
    console.log(this.template.instruments, this.availableInstruments, instrumentValue, instrument);
    if (instrument) {
      this.instrumentOptions = [...this.instrumentOptions, instrument];
    }
    console.log(this.instrumentOptions);
  }
}
