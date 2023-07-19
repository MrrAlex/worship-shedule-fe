import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../Constants';
import { Instrument } from '../models/instrument.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  constructor(private http: HttpService) {}

  loadInstruments() {
    return this.http.get<Instrument[]>(Constants.INSTRUMENTS_API);
  }

  updateInstrument(id: string, instrument: Instrument) {
    return this.http.post<Instrument, Instrument>(
      Constants.INSTRUMENT_API(id),
      instrument,
    );
  }

  addInstrument(instrument: Instrument) {
    return this.http.post<Instrument, Instrument>(
      Constants.INSTRUMENT_API(''),
      instrument,
    );
  }

  deleteInstrument(id: string) {
    return this.http.delete(Constants.INSTRUMENT_API(id));
  }
}
