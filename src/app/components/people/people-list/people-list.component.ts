import { Component } from '@angular/core';
import { EndpointsService } from '../../../services/endpoints.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { filter, firstValueFrom, switchMap } from 'rxjs';
import { PeopleDatasource } from '../../../datasources/people.datasource';
import { Person } from '../../../models/people.model';
import { AddPeopleModalComponent } from '../add-people-modal/add-people-modal.component';
import { Instrument } from '../../../models/instrument.model';

@Component({
  selector: 'ws-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent {
  constructor(
    private endpointsService: EndpointsService,
    public dialog: MatDialog,
  ) {
    this.peopleDatasource = new PeopleDatasource(this.endpointsService);
  }

  peopleDatasource: PeopleDatasource;
  displayedColumns = ['name', 'instruments', 'actions'];
  instruments!: Instrument[];

  ngOnInit() {
    this.peopleDatasource.loadPeople();
    this.endpointsService.loadInstruments().subscribe((data) => {
      this.instruments = data;
    });
  }

  parseInstrumentsToNames(ids: string[]) {
    return ids.map((id) => this.instruments.find((i) => i._id === id)?.name).join(", ");
  }

  openDeleteDialog(person: Person) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'w-6',
      hasBackdrop: true,
    });

    ref
      .afterClosed()
      .pipe(
        filter((data) => data),
        switchMap(() => this.endpointsService.deletePerson(person._id)),
      )
      .subscribe(() => {
        this.peopleDatasource.loadPeople();
      });
  }

  async openAddPersonModal(person?: Person) {
    const isEdit = !!person;
    const personData = isEdit
      ? await firstValueFrom(this.endpointsService.loadPerson(person._id))
      : null;
    const ref = this.dialog.open(AddPeopleModalComponent, {
      data: {
        person: personData,
        instruments: this.instruments,
        header: isEdit
          ? 'Изменить члена команды'
          : 'Добавить нового члена команды',
      },
      panelClass: 'w-6',
      hasBackdrop: true,
    });

    ref
      .afterClosed()
      .pipe(
        filter((data) => data),
        switchMap((data: Person) => {
          return isEdit
            ? this.endpointsService.updatePerson(data._id, data)
            : this.endpointsService.addPerson(data);
        }),
      )
      .subscribe(() => {
        this.peopleDatasource.loadPeople();
      });
  }
}
