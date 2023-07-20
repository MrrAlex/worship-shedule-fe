import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, forkJoin, iif, map, of, switchMap, take, tap } from 'rxjs';
import { EndpointsService } from '../../../services/endpoints.service';
import { Service } from '../../../models/service.model';
import { Person } from '../../../models/people.model';
import { Instrument } from '../../../models/instrument.model';

@Component({
  selector: 'ws-add-new-service-page',
  templateUrl: './add-new-service-page.component.html',
  styleUrls: ['./add-new-service-page.component.scss'],
})
export class AddNewServicePageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private endpointsService: EndpointsService,
  ) {}

  loading = false;
  service!: Service;
  leaders!: Person[];
  people!: Record<string, Person[]>;
  instruments!: Instrument[];

  ngOnInit() {
    forkJoin([
      this.endpointsService.loadPeople(),
      this.endpointsService.loadInstruments(),
      this.route.data.pipe(
        take(1),
        map((data) => data['id']),
        switchMap((id) =>
          id ? this.endpointsService.loadService(id) : of(null),
        ),
      ),
    ]).subscribe({
      next: ([people, instruments, service]) => {
        if (service) {
          this.service = service;
        }
        const leaderInstrumentId = instruments.find((i) => i.name === 'Ведущий')
          ?._id as string;

        this.people = instruments.reduce(
          (acc, instrument) => {
            const instrumentId = instrument._id;
            const peopleByInstrument = people.filter((p) =>
              p.instruments.includes(instrument._id),
            );
            console.log(
              instrument,
              peopleByInstrument,
              peopleByInstrument.length === 0,
            );
            if (peopleByInstrument.length === 0) {
              return acc;
            }
            if (instrumentId === leaderInstrumentId) {
              this.leaders = peopleByInstrument;
            } else {
              acc[instrument._id] = peopleByInstrument;
            }
            return acc;
          },
          {} as Record<string, Person[]>,
        );

        const instrumentsWithPeoplePresent = Object.keys(this.people);
        this.instruments = instruments.filter(
          (i) =>
            i.name !== 'Ведущий' &&
            instrumentsWithPeoplePresent.includes(i._id),
        );

        this.loading = false;
      },
    });
  }
}
