import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { EndpointsService } from '../services/endpoints.service';
import { Service } from '../models/service.model';
import { Rehearsal } from '../components/rehearsal/model/rehearsal.model';

export class RehearsalDatasource implements DataSource<Rehearsal> {
  constructor(private endpointsService: EndpointsService) {}

  private rehearsals$ = new BehaviorSubject<Rehearsal[]>([]);
  public rehearsals: Rehearsal[] = [];

  private _loading$ = new BehaviorSubject(true);
  public loading$ = this._loading$.asObservable();
  connect(collectionViewer: CollectionViewer): Observable<Rehearsal[]> {
    return this.rehearsals$.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer) {
    this.rehearsals$.complete();
  }

  public loadServices() {
    this._loading$.next(true);
    this.endpointsService.loadRehearsals().subscribe((rehearsals) => {
      this.rehearsals$.next(rehearsals);
      this.rehearsals = rehearsals;
      this._loading$.next(false);
    });
  }
}
