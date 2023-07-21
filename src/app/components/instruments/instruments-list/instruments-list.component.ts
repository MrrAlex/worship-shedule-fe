import { Component, OnInit } from '@angular/core';
import { Instrument } from '../../../models/instrument.model';
import { InstrumentDataSource } from '../../../datasources/instrument.datasource';
import { EndpointsService } from '../../../services/endpoints.service';
import { MatDialog } from '@angular/material/dialog';
import { InstrumentAddModalComponent } from '../instrument-add-modal/instrument-add-modal.component';
import { filter, Observable, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'ws-instruments-list',
  templateUrl: './instruments-list.component.html',
  styleUrls: ['./instruments-list.component.scss'],
})
export class InstrumentsListComponent implements OnInit {
  constructor(
    private endpointsService: EndpointsService,
    public dialog: MatDialog,
    private snackBar: SnackbarService,
  ) {
    this.instrumentsDatasource = new InstrumentDataSource(
      this.endpointsService,
    );
  }

  loading$!: Observable<boolean>;
  instrumentsDatasource: InstrumentDataSource;
  displayedColumns = ['name', 'actions'];

  ngOnInit() {
    this.loading$ = this.instrumentsDatasource.loading$;
    this.instrumentsDatasource.loadInstruments();
  }

  openDeleteDialog(instrument: Instrument) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'w-6',
      data: {
        text: 'Вы уверены, что хотите удалить этот инструмент? Это действие нельзя будет отменить.',
      },
      hasBackdrop: true,
    });

    ref
      .afterClosed()
      .pipe(
        filter((data) => data),
        switchMap(() => this.endpointsService.deleteInstrument(instrument._id)),
      )
      .subscribe({
        next: () => {
          this.snackBar.message('Инструмент был удален');
          this.instrumentsDatasource.loadInstruments();
        },
        error: () => {
          this.snackBar.error();
        },
      });
  }

  openAddInstrumentDialog(instrument?: Instrument) {
    const isEdit = !!instrument;
    const ref = this.dialog.open(InstrumentAddModalComponent, {
      data: {
        instrument,
        header: isEdit ? 'Изменить инструмент' : 'Добавить новый инструмент',
        instrumentsNames: this.instrumentsDatasource.instruments.map(
          (i) => i.name,
        ),
      },
      panelClass: 'w-6',
      hasBackdrop: true,
    });

    ref
      .afterClosed()
      .pipe(
        filter((data) => data),
        switchMap((data: Instrument) => {
          return isEdit
            ? this.endpointsService.updateInstrument(data._id, data)
            : this.endpointsService.addInstrument(data);
        }),
      )
      .subscribe({
        next: () => {
          this.instrumentsDatasource.loadInstruments();
          this.snackBar.message(
            isEdit
              ? 'Инструмент успешно изменен'
              : 'Инструмент успешно добавлен ',
          );
        },
        error: () => this.snackBar.error(),
      });
  }
}
