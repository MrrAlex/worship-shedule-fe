import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { EndpointsService } from '../services/endpoints.service';
import { Service } from '../models/service.model';

export class ServiceDatasource implements DataSource<Service> {
  constructor(private endpointsService: EndpointsService) {}

  private services$ = new BehaviorSubject<Service[]>([]);
  public services: Service[] = [];

  private _loading$ = new BehaviorSubject(true);
  public loading$ = this._loading$.asObservable();
  connect(collectionViewer: CollectionViewer): Observable<Service[]> {
    return this.services$.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer) {
    this.services$.complete();
  }

  public loadServices() {
    this._loading$.next(true);
    this.endpointsService.loadServices().subscribe((services) => {
      this.services$.next(services);
      this.services = services;
      this._loading$.next(false);
    });
  }
}
