export interface ServiceTemplate {
  _id: string;
  name: string;
  description: string;
  instruments: TemplateInstrumentConfig[];
}

export interface TemplateInstrumentConfig {
  instrument: string;
  members: number;
  id: string;
}
