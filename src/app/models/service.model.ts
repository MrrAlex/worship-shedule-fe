export interface Service {
  _id: string;
  name: string;
  leader: string;
  date: Date;
  instruments: ServiceInstrumentConfig[];
}

export interface ServiceInstrumentConfig {
  instrument: string;
  members: string[];
  id: string;
}
