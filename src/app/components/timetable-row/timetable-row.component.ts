import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ws-timetable-col',
  templateUrl: './timetable-row.component.html',
  styleUrls: ['./timetable-row.component.scss'],
})
export class TimetableRowComponent implements OnInit {
  @Input()
  people!: any[];

  @Input()
  instrumentId!: string;

  @Input()
  serviceId!: string;

  @Input()
  participations!: any[];

  participationConfig!: Record<string, boolean>;

  ngOnInit() {
    this.participationConfig = this.people.reduce(
      (acc, next) => ({
        ...acc,
        [next._id]: this.findParticipationItem(
          next._id,
          this.instrumentId,
          this.serviceId,
        ),
      }),
      {} as Record<string, boolean>,
    );
  }

  findParticipationItem(
    personId: string,
    instrumentId: string,
    serviceId: string,
  ) {
    return !!this.participations.find(
      (p) =>
        p.service === serviceId &&
        p.instrument === instrumentId &&
        p.person === personId,
    );
  }
}
