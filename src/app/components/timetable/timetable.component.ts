import { Component, OnInit } from '@angular/core';
import { EndpointsService } from '../../services/endpoints.service';
import { DateTime } from 'luxon';
import {Constants} from "../../Constants";

@Component({
  selector: 'ws-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent implements OnInit {
  constructor(private endpointsService: EndpointsService) {}

  instruments: any;
  services: any;
  participations: any;

  loading = true;

  ngOnInit() {
    const from = DateTime.now().minus({ day: 30 }).toString();
    const to = DateTime.now().plus({ day: 30 }).toString();
    this.endpointsService.loadTimetable(from, to).subscribe((data: any) => {
      this.instruments = data.instruments;
      this.services = data.services;
      this.participations = data.participations;

      const leaderInstrumentId = this.instruments.find(
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

      this.loading = false;
    });
  }
}
