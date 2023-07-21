import { Component } from '@angular/core';
import { EndpointsService } from '../../../services/endpoints.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { filter, firstValueFrom, Observable, switchMap } from 'rxjs';
import { PeopleDatasource } from '../../../datasources/people.datasource';
import { Person } from '../../../models/people.model';
import { AddPeopleModalComponent } from '../add-people-modal/add-people-modal.component';
import { Instrument } from '../../../models/instrument.model';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'ws-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent {
  constructor(
    private endpointsService: EndpointsService,
    public dialog: MatDialog,
    private snackBar: SnackbarService,
  ) {
    this.peopleDatasource = new PeopleDatasource(this.endpointsService);
  }

  peopleDatasource: PeopleDatasource;
  displayedColumns = ['name', 'instruments', 'actions'];
  instruments!: Instrument[];
  loading$!: Observable<boolean>;

  ngOnInit() {
    this.loading$ = this.peopleDatasource.loading$;
    this.peopleDatasource.loadPeople();
    this.endpointsService.loadInstruments().subscribe((data) => {
      this.instruments = data;
    });
  }

  parseInstrumentsToNames(ids: string[]) {
    return ids
      .map((id) => this.instruments.find((i) => i._id === id)?.name)
      .join(', ');
  }

  openDeleteDialog(person: Person) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'w-6',
      data: {
        text: 'Вы уверены, что хотите удалить этого человека? Это действие отменить нельзя.'
      },
      hasBackdrop: true,
    });

    ref
      .afterClosed()
      .pipe(
        filter((data) => data),
        switchMap(() => this.endpointsService.deletePerson(person._id)),
      )
      .subscribe({
        next: () => {
          this.peopleDatasource.loadPeople();
          this.snackBar.message('Член команды был успешно удален');
        },
        error: () => this.snackBar.error(),
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
      .subscribe({
        next: () => {
          this.peopleDatasource.loadPeople();
          this.snackBar.message(
            isEdit
              ? 'Член команды был успешно изменен'
              : 'Член команды был успешно сохранен',
          );
        },
        error: () => this.snackBar.error(),
      });
  }
}
