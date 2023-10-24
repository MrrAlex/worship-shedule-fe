import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../Constants';
import { Instrument } from '../models/instrument.model';
import { HttpService } from './http.service';
import { ServiceTemplate } from '../models/service-template.model';
import { Service } from '../models/service.model';
import { Person } from '../models/people.model';
import {
  Rehearsal,
  RehearsalPlace,
} from '../components/rehearsal/model/rehearsal.model';

@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  constructor(private http: HttpService) {}

  loadInstruments() {
    return this.http.get<Instrument[]>(Constants.INSTRUMENTS_API);
  }

  updateInstrument(id: string, instrument: Instrument) {
    return this.http.post<Instrument, Instrument>(
      Constants.INSTRUMENT_API(id),
      instrument,
    );
  }

  addInstrument(instrument: Instrument) {
    return this.http.post<Instrument, Instrument>(
      Constants.INSTRUMENT_API(''),
      instrument,
    );
  }

  deleteInstrument(id: string) {
    return this.http.delete(Constants.INSTRUMENT_API(id));
  }

  loadTemplates() {
    return this.http.get<ServiceTemplate[]>(Constants.SERVICE_TEMPLATES_API);
  }

  loadTemplate(id: string) {
    return this.http.get<ServiceTemplate>(Constants.SERVICE_TEMPLATE_API(id));
  }

  updateTemplate(id: string, template: ServiceTemplate) {
    return this.http.post<ServiceTemplate, ServiceTemplate>(
      Constants.SERVICE_TEMPLATE_API(id),
      template,
    );
  }

  addTemplate(template: ServiceTemplate) {
    return this.http.post<ServiceTemplate, ServiceTemplate>(
      Constants.SERVICE_TEMPLATE_API(''),
      template,
    );
  }

  deleteTemplate(id: string) {
    return this.http.delete(Constants.SERVICE_TEMPLATE_API(id));
  }

  loadPeople() {
    return this.http.get<Person[]>(Constants.PEOPLE_API);
  }

  loadPerson(id: string) {
    return this.http.get<Person>(Constants.PERSON_API(id));
  }

  updatePerson(id: string, person: Person) {
    return this.http.post<Person, Person>(Constants.PERSON_API(id), person);
  }

  addPerson(person: Person) {
    return this.http.post<Person, Person>(Constants.PERSON_API(''), person);
  }

  deletePerson(id: string) {
    return this.http.delete(Constants.PERSON_API(id));
  }

  loadServices() {
    return this.http.get<Service[]>(Constants.SERVICES_API);
  }

  loadService(id: string) {
    return this.http.get<Service>(Constants.SERVICE_API(id));
  }

  updateService(id: string, service: Service) {
    return this.http.post<Service, Service>(Constants.SERVICE_API(id), service);
  }

  addService(service: Service) {
    return this.http.post<Service, Service>(Constants.SERVICE_API(''), service);
  }

  deleteService(id: string) {
    return this.http.delete(Constants.SERVICE_API(id));
  }

  loadTimetable(dateFrom: string, dateTo: string) {
    return this.http.get(Constants.TIMETABLE_API, { dateFrom, dateTo });
  }

  getPeopleWithTooManyDays() {
    return this.http.get<string[]>(Constants.PERSON_SERVED_MANY);
  }

  loadRehearsals() {
    return this.http.get<Rehearsal[]>(Constants.REHEARSAL_API);
  }

  loadPlaces() {
    return this.http.get<RehearsalPlace[]>(Constants.REHEARSAL_PLACE_API);
  }

  createRehearsal(data: Rehearsal) {
    return this.http.post<Rehearsal, Rehearsal>(Constants.REHEARSAL_API, data);
  }

  updateRehearsal(id: string, data: Rehearsal) {
    return this.http.post<Rehearsal, Rehearsal>(
      Constants.REHEARSAL_BY_ID_API(id),
      data,
    );
  }

  deleteRehearsal(id: string) {
    return this.http.delete(Constants.REHEARSAL_BY_ID_API(id));
  }
}
