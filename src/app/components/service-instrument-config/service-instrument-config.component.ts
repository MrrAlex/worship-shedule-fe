import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
} from '@angular/forms';
import { Person } from '../../models/people.model';

@Component({
  selector: 'ws-service-instrument-config',
  templateUrl: './service-instrument-config.component.html',
  styleUrls: ['./service-instrument-config.component.scss'],
})
export class ServiceInstrumentConfigComponent implements OnInit {
  constructor(private fb: UntypedFormBuilder) {}

  @Output()
  instrumentRemoved = new EventEmitter();

  @Input()
  name!: string;

  @Input()
  control!: UntypedFormControl;

  @Input()
  instrumentAvailablePeople!: Person[];

  peopleOptions!: Person[];

  ngOnInit() {
    this.peopleOptions = this.instrumentAvailablePeople.map((p) => ({ ...p }));
    this.personSelected()
  }

  removeInstrument() {
    this.instrumentRemoved.emit();
  }

  get peopleForm() {
    return this.control.get('people') as UntypedFormArray;
  }

  get people() {
    return this.peopleForm.controls as UntypedFormControl[];
  }

  removePerson(i: number) {
    this.peopleForm.removeAt(i);
  }

  addPerson() {
    this.peopleForm.push(this.fb.control(''));
  }

  personSelected() {
    const selected: string[] = this.peopleForm.value;
    this.peopleOptions.forEach((p) => {
      p.disabled = selected.includes(p._id);
    });
  }
}
