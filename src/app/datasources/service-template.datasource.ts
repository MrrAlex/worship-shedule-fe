import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Instrument } from '../models/instrument.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { EndpointsService } from '../services/endpoints.service';
import {ServiceTemplate} from "../models/service-template.model";

export class ServiceTemplateDatasource implements DataSource<ServiceTemplate> {
  constructor(private endpointsService: EndpointsService) {}

  private templates$ = new BehaviorSubject<ServiceTemplate[]>([]);
  public templates: ServiceTemplate[] = [];
  connect(collectionViewer: CollectionViewer): Observable<ServiceTemplate[]> {
    return this.templates$.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer) {
    this.templates$.complete();
  }

  public loadTemplates() {
    this.endpointsService
      .loadTemplates()
      .subscribe((templates) => {
        this.templates$.next(templates)
        this.templates = templates;
      });
  }
}
