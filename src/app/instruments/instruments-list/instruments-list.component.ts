import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Instrument } from '../../models/instrument.model';
import { InstrumentDataSource } from '../../datasources/instrument.datasource';
import { EndpointsService } from '../../services/endpoints.service';
import { MatDialog } from '@angular/material/dialog';
import { InstrumentAddModalComponent } from '../instrument-add-modal/instrument-add-modal.component';
import { filter, of, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ws-instruments-list',
  templateUrl: './instruments-list.component.html',
  styleUrls: ['./instruments-list.component.scss'],
})
export class InstrumentsListComponent implements OnInit {
  constructor(
    private endpointsService: EndpointsService,
    public dialog: MatDialog,
  ) {
    this.instrumentsDatasource = new InstrumentDataSource(
      this.endpointsService,
    );
  }

  instrumentsDatasource: InstrumentDataSource;
  displayedColumns = ['name', 'actions'];

  ngOnInit() {
    this.instrumentsDatasource.loadInstruments();
  }

  openDeleteDialog(instrument: Instrument) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'w-6',
      hasBackdrop: true,
    });

    ref
      .afterClosed()
      .pipe(
        filter((data) => data),
        switchMap(() =>
          this.endpointsService.deleteInstrument(instrument._id),
        ),
      )
      .subscribe(() => {
        console.log(123)
        this.instrumentsDatasource.loadInstruments();
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
      .subscribe(() => {
        this.instrumentsDatasource.loadInstruments();
      });
  }
}
