export interface Person {
  _id: string;
  name: string;
  instruments: string[];
  disabled?: boolean;
  isError?: boolean;
}
