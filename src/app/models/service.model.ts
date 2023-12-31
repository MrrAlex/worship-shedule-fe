import {Person} from "./people.model";

export interface Service {
  _id: string;
  name: string;
  leader: Person;
  date: Date;
  isForSend: boolean;
  instruments: ServiceInstrumentConfig[];
}

export interface ServiceInstrumentConfig {
  instrument: string;
  people: string[];
}
