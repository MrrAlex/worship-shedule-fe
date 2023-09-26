import {Person} from "./people.model";

export interface Instrument {
  _id: string;
  id: string;
  name: string;
  people: Person[];
  isUsed: boolean;
}
