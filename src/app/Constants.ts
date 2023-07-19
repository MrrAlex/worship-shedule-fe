export class Constants {
  private static readonly BASE_URL = 'http://localhost:3000';

  public static readonly INSTRUMENTS_API = `${Constants.BASE_URL}/instrument`;
  public static readonly INSTRUMENT_API = (id: string) => `${Constants.INSTRUMENTS_API}/${id}`;

  public static readonly SERVICE_TEMPLATES_API = `${Constants.BASE_URL}/service-template`;
  public static readonly SERVICE_TEMPLATE_API = (id: string) => `${Constants.SERVICE_TEMPLATES_API}/${id}`;
}
