import {Person} from "./people.model";

export interface Timetable {
  instruments: any;
  dates: TimetableDate[];
  participation: TimetableParticipation[];
}

export interface TimetableParticipation {
  service: string;
  person: string;
}

export interface TimetableDate {
  id: string,
  date: string
}
