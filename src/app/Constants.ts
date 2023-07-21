export class Constants {
  private static readonly BASE_URL = 'https://zany-ruby-zebra-cape.cyclic.app/';

  public static readonly INSTRUMENTS_API = `${Constants.BASE_URL}/instrument`;
  public static readonly INSTRUMENT_API = (id: string) => `${Constants.INSTRUMENTS_API}/${id}`;

  public static readonly SERVICE_TEMPLATES_API = `${Constants.BASE_URL}/service-template`;
  public static readonly SERVICE_TEMPLATE_API = (id: string) => `${Constants.SERVICE_TEMPLATES_API}/${id}`;

  public static readonly SERVICES_API = `${Constants.BASE_URL}/service`;
  public static readonly SERVICE_API = (id: string) => `${Constants.SERVICES_API}/${id}`;

  public static readonly PEOPLE_API = `${Constants.BASE_URL}/people`;
  public static readonly PERSON_API = (id: string) => `${Constants.PEOPLE_API}/${id}`;

  public static readonly TIMETABLE_API = `${Constants.BASE_URL}/timetable`;


  public static readonly LEADER_LABEL = 'Ответственный за служение';
}
