import { Component, OnInit } from '@angular/core';
import { AddServiceChooseTemplateModalComponent } from '../../../service/add-service-choose-template/add-service-choose-template-modal.component';
import { filter, firstValueFrom, Observable, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddRehearsalModalComponent } from '../add-rehearsal-modal/add-rehearsal-modal.component';
import { Rehearsal, RehearsalPlace } from '../../model/rehearsal.model';
import { EndpointsService } from '../../../../services/endpoints.service';
import { SnackbarService } from '../../../../services/snackbar.service';
import { RehearsalDatasource } from '../../../../datasources/rehearsal.datasource';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ws-rehearsal-page',
  templateUrl: './rehearsal-page.component.html',
  styleUrls: ['./rehearsal-page.component.scss'],
})
export class RehearsalPageComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private http: EndpointsService,
    private snackBar: SnackbarService,
  ) {
    this.datasource = new RehearsalDatasource(http);
    this.loading$ = this.datasource.loading$;
  }

  places!: RehearsalPlace[];
  datasource: RehearsalDatasource;

  loading$: Observable<boolean>;

  displayedColumns = ['date', 'place', 'actions'];

  ngOnInit() {
    this.loadRehearsals();
  }

  loadRehearsals() {
    this.datasource.loadServices();
  }

  async openRehearsalDialog(rehearsal?: Rehearsal) {
    if (!this.places) {
      this.places = await firstValueFrom(this.http.loadPlaces());
    }
    const isEdit = !!rehearsal;
    const ref = this.dialog.open(AddRehearsalModalComponent, {
      data: {
        header: isEdit ? 'Изменить репетицию' : 'Новая репетиция',
        places: this.places,
        rehearsal,
      },
      hasBackdrop: true,
    });

    ref
      .afterClosed()
      .pipe(
        filter((data) => data),
        switchMap((rehearsalData: Rehearsal) =>
          isEdit
            ? this.http.updateRehearsal(rehearsal?._id, rehearsalData)
            : this.http.createRehearsal(rehearsalData),
        ),
      )
      .subscribe({
        next: (data) => {
          this.loadRehearsals();
        },
        error: () => this.snackBar.error(),
      });
  }

  openDeleteDialog(rehearsal: Rehearsal) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        text: 'Вы уверены, что хотите удалить эту репетицию? Это действие отменить нельзя.',
      },
      hasBackdrop: true,
    });

    ref
      .afterClosed()
      .pipe(
        filter((data) => data),
        switchMap(() => this.http.deleteRehearsal(rehearsal._id)),
      )
      .subscribe({
        next: () => {
          this.datasource.loadServices();
          this.snackBar.message('Репетиция успешно удалена');
        },
        error: () => this.snackBar.error(),
      });
  }
}
