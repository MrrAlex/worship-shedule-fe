export class Constants {
  private static readonly BASE_URL = 'http://localhost:3000';

  public static readonly INSTRUMENTS_API = `${Constants.BASE_URL}/instrument`;
  public static readonly INSTRUMENT_API = (id: string) =>
    `${Constants.BASE_URL}/instrument/${id}`;
}
