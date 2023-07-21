import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { EndpointsService } from '../services/endpoints.service';
import { Person } from '../models/people.model';

export class PeopleDatasource implements DataSource<Person> {
  constructor(private endpointsService: EndpointsService) {}

  private _loading$ = new BehaviorSubject(true);
  public loading$ = this._loading$.asObservable();

  private people$ = new BehaviorSubject<Person[]>([]);
  public people: Person[] = [];
  connect(collectionViewer: CollectionViewer): Observable<Person[]> {
    return this.people$.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer) {
    this.people$.complete();
  }

  public loadPeople() {
    this._loading$.next(true);
    this.endpointsService.loadPeople().subscribe((people) => {
      this.people$.next(people);
      this.people = people;
      this._loading$.next(false);
    });
  }
}
