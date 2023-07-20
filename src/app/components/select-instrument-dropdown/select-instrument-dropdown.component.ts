import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Instrument } from '../../models/instrument.model';
import { Observable } from 'rxjs';
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'ws-select-instrument-dropdown',
  templateUrl: './select-instrument-dropdown.component.html',
  styleUrls: ['./select-instrument-dropdown.component.scss'],
})
export class SelectInstrumentDropdownComponent implements OnInit {
  @Input()
  instruments!: Instrument[];
  @Input()
  optionRemoved$!: Observable<string>;

  @Output()
  instrumentAdded = new EventEmitter();

  options!: Instrument[];

  @ViewChild('instrumentSelect')
  instrumentSelect!: MatSelect;

  ngOnInit() {
    this.options = this.instruments;

    this.optionRemoved$.subscribe((data) => {
      const removed = this.instruments.find((i) => i._id === data);
      if (removed) {
        this.options.push(removed);
      }
    });
  }

  addInstrument(selected: string) {
    let instrumentName = '';
    this.options = this.options.filter((i) => {
      if (i._id === selected) {
        instrumentName = i.name;
        return false;
      }
      return true;
    });

    this.instrumentAdded.emit({ id: selected, name: instrumentName });
    this.instrumentSelect.writeValue(null);
  }
}
