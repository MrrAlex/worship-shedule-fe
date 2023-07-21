import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Instrument } from '../models/instrument.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { EndpointsService } from '../services/endpoints.service';

export class InstrumentDataSource implements DataSource<Instrument> {
  constructor(private endpointsService: EndpointsService) {}

  private _loading$ = new BehaviorSubject(true);
  public loading$ = this._loading$.asObservable();

  private instruments$ = new BehaviorSubject<Instrument[]>([]);
  public instruments: Instrument[] = [];
  connect(collectionViewer: CollectionViewer): Observable<Instrument[]> {
    return this.instruments$.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer) {
    this.instruments$.complete();
  }

  public loadInstruments() {
    this._loading$.next(true);
    this.endpointsService.loadInstruments().subscribe((instruments) => {
      this.instruments$.next(instruments);
      this.instruments = instruments;
      this._loading$.next(false);
    });
  }
}
