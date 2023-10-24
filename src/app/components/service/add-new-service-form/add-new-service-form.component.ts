import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Service } from '../../../models/service.model';
import {
  FormControl,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Person } from '../../../models/people.model';
import { Instrument } from '../../../models/instrument.model';
import { BehaviorSubject, filter } from 'rxjs';
import { ServiceTemplate } from '../../../models/service-template.model';
import { MatDialog } from '@angular/material/dialog';
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'ws-add-new-service-form',
  templateUrl: './add-new-service-form.component.html',
  styleUrls: ['./add-new-service-form.component.scss'],
})
export class AddNewServiceFormComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    public dialog: MatDialog,
  ) {}

  @Input()
  service!: Service;

  @Input()
  leaders!: Person[];

  @Input()
  instruments!: Instrument[];

  @Input()
  template!: ServiceTemplate;

  @Input()
  people!: Record<string, Person[]>;

  @Output()
  serviceSaved = new EventEmitter();

  serviceForm!: UntypedFormGroup;
  instrumentOptions!: Instrument[];
  instrumentNames: string[] = [];

  instrumentRemoved$ = new BehaviorSubject('');

  ngOnInit() {
    let selectedInstruments: UntypedFormGroup[] = [];
    this.instrumentOptions = this.instruments;
    if (this.service?.instruments) {
      selectedInstruments = this.service.instruments.map((i, index) => {
        this.instrumentNames[index] = this.instrumentOptions.find(
          (instr) => instr._id === i.instrument,
        )?.name as string;
        this.instrumentOptions = this.instrumentOptions.filter(
          (instr) => instr._id !== i.instrument,
        );
        return this.fb.group({
          instrument: i.instrument,
          people: this.fb.array(i.people),
        });
      });
    } else if (this.template) {
      selectedInstruments = this.template.instruments.map((i, index) => {
        this.instrumentNames[index] = i.instrument;
        return this.fb.group({
          instrument: i.id,
          people: this.fb.array(new Array(i.members).fill('')),
        });
      });
    }

    this.serviceForm = this.fb.group({
      name: [this.service?.name ?? '', Validators.required],
      date: [this.service?.date ?? '', Validators.required],
      isForSend: [this.service?.isForSend ?? false],
      leader: [this.service?.leader?._id ?? '', Validators.required],
      instruments: this.fb.array(selectedInstruments),
    });
  }

  get name() {
    return this.serviceForm.get('name') as FormControl<string>;
  }

  get date() {
    return this.serviceForm.get('date') as UntypedFormControl;
  }

  get leader() {
    return this.serviceForm.get('leader') as FormControl<string>;
  }

  get isForSend() {
    return this.serviceForm.get('isForSend') as FormControl<string>;
  }

  get instrumentConfig() {
    return this.serviceForm.get('instruments') as UntypedFormArray;
  }

  get instrumentControls() {
    return this.instrumentConfig.controls as UntypedFormControl[];
  }

  addInstrumentToService({ id, name }: { id: string; name: string }) {
    this.instrumentConfig.push(
      this.fb.group({
        instrument: id,
        people: this.fb.array(['']),
      }),
    );
    this.instrumentNames[this.instrumentConfig.length - 1] = name;
  }

  removeInstrument(i: number) {
    const instrumentValue = this.instrumentConfig.at(i).value;
    this.instrumentConfig.removeAt(i);
    this.instrumentNames = this.instrumentNames.filter(
      (instr, index) => index !== i,
    );
    this.instrumentRemoved$.next(instrumentValue.instrument);
  }

  save() {
    const value = this.serviceForm.value;
    if (value.instruments.length > 0 && !value.isForSend) {
      const ref = this.dialog.open(ConfirmDialogComponent, {
        data: {
          text: 'В служение добавлены участники, но оно не отмечено как готовое к отправке. Вы уверены, что хотите продолжить?',
        },
        hasBackdrop: true,
      });

      ref
        .afterClosed()
        .pipe(filter((data) => data))
        .subscribe({
          next: () => {
            this.serviceSaved.emit(value);
          },
        });
    } else {
      this.serviceSaved.emit(value);
    }
  }

  getPeopleForInstrument({ instrument }: any) {
    return this.people[instrument];
  }
}
