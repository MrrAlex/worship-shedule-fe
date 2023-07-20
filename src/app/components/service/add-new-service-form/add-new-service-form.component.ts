import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
import { MatSelect } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ws-add-new-service-form',
  templateUrl: './add-new-service-form.component.html',
  styleUrls: ['./add-new-service-form.component.scss'],
})
export class AddNewServiceFormComponent implements OnInit {
  constructor(private fb: UntypedFormBuilder) {}

  @Input()
  service!: Service;

  @Input()
  leaders!: Person[];

  @Input()
  instruments!: Instrument[];

  @Input()
  people!: Record<string, Person[]>;

  @Output()
  serviceSaved = new EventEmitter();

  serviceForm!: UntypedFormGroup;
  instrumentOptions!: Instrument[];
  instrumentNames: string[] = [];

  instrumentRemoved$ = new BehaviorSubject('');

  ngOnInit() {
    this.instrumentOptions = this.instruments;

    this.serviceForm = this.fb.group({
      name: [this.service?.name ?? '', Validators.required],
      date: [this.service?.date ?? '', Validators.required],
      leader: [this.service?.leader ?? '', Validators.required],
      instruments: this.fb.array([], { validators: Validators.required }),
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

  save() {}

  getPeopleForInstrument({instrument}: any) {
    return this.people[instrument];
  }
}
