import { Component, OnInit } from '@angular/core';
import { EndpointsService } from '../../services/endpoints.service';
import { DateTime } from 'luxon';
import { Constants } from '../../Constants';
import { forkJoin } from 'rxjs';
import { Instrument } from '../../models/instrument.model';
import { Person } from '../../models/people.model';

@Component({
  selector: 'ws-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent implements OnInit {
  constructor(private endpointsService: EndpointsService) {}

  instruments!: Instrument[];
  services: any;
  participations: any;

  peopleError = new Set<string>();

  loading = true;

  ngOnInit() {
    const from = DateTime.now().minus({ day: 30 }).toString();
    const to = DateTime.now().plus({ day: 30 }).toString();
    forkJoin([
      this.endpointsService.loadTimetable(from, to),
      this.endpointsService.getPeopleWithTooManyDays(),
    ]).subscribe(([ttData, peopleErrors]: any[]) => {
      this.instruments = ttData.instruments;
      this.services = ttData.services;
      this.participations = ttData.participations;

      const leaderInstrumentId = ttData.instruments.find(
        (i: any) => i.name === Constants.LEADER_LABEL,
      ).id;
      if (leaderInstrumentId) {
        const leaderParticipations = this.services.map((s: any) => ({
          service: s._id,
          person: s.leader,
          instrument: leaderInstrumentId,
        }));
        this.participations.push(...leaderParticipations);
      }

      this.instruments.forEach((i) => {
        i.people.forEach((p) => {
          const error = peopleErrors.includes(p._id);
          if (error) {
            p.isError = peopleErrors.includes(p._id);
            this.peopleError.add(p.name);
          }
        });
      });

      this.loading = false;
    });
  }
}
