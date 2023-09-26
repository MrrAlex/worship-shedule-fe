import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, of, switchMap, take } from 'rxjs';
import { EndpointsService } from '../../../services/endpoints.service';
import { Service } from '../../../models/service.model';
import { Person } from '../../../models/people.model';
import { Instrument } from '../../../models/instrument.model';
import { SnackbarService } from '../../../services/snackbar.service';
import { Constants } from '../../../Constants';
import { ServiceTemplate } from '../../../models/service-template.model';

@Component({
  selector: 'ws-add-new-service-page',
  templateUrl: './add-new-service-page.component.html',
  styleUrls: ['./add-new-service-page.component.scss'],
})
export class AddNewServicePageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private endpointsService: EndpointsService,
    private snackbarService: SnackbarService,
  ) {}

  loading = false;
  service!: Service;
  template!: ServiceTemplate;
  leaders!: Person[];
  people!: Record<string, Person[]>;
  instruments!: Instrument[];

  ngOnInit() {
    forkJoin([
      this.endpointsService.loadPeople(),
      this.endpointsService.getPeopleWithTooManyDays(),
      this.endpointsService.loadInstruments(),
      this.route.params.pipe(
        take(1),
        map((data) => data['id']),
        switchMap((id) =>
          id ? this.endpointsService.loadService(id) : of(null),
        ),
      ),
      this.route.queryParams.pipe(
        take(1),
        map((data) => data['templateId']),
        switchMap((id) =>
          id ? this.endpointsService.loadTemplate(id) : of(null),
        ),
      ),
    ]).subscribe({
      next: ([people, peopleErrors, instruments, service, template]) => {
        if (service) {
          this.service = service;
        }
        if (template) {
          this.template = template;
        }
        const leaderInstrumentId = instruments.find(
          (i) => i.name === Constants.LEADER_LABEL,
        )?._id as string;

        this.people = instruments.reduce(
          (acc, instrument) => {
            const instrumentId = instrument._id;
            const peopleByInstrument = people.filter((p) =>
              p.instruments.includes(instrument._id),
            );
            if (peopleByInstrument.length === 0) {
              return acc;
            }
            peopleByInstrument.forEach(
              (p) => (p.isError = peopleErrors.includes(p._id)),
            );
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
            i.name !== Constants.LEADER_LABEL &&
            instrumentsWithPeoplePresent.includes(i._id),
        );

        this.loading = false;
      },
    });
  }

  saveService(saved: Service) {
    let action$;
    if (this.service) {
      action$ = this.endpointsService.updateService(this.service._id, saved);
    } else {
      action$ = this.endpointsService.addService(saved);
    }
    action$.subscribe({
      next: () =>
        this.snackbarService.message(
          this.service
            ? 'Служение было успешно изменено'
            : 'Служение было успешно сохранено',
        ),
      error: () => this.snackbarService.error(),
    });
  }
}
