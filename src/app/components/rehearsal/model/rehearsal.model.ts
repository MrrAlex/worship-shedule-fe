export interface Rehearsal {
  _id: string;
  date: Date;
  place?: RehearsalPlace;
  placeId?: string;
}

export interface RehearsalPlace {
  _id?: string;
  name: string;
  address: string;
}
