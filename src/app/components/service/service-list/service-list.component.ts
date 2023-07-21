import { Component } from '@angular/core';
import {EndpointsService} from "../../../services/endpoints.service";
import {MatDialog} from "@angular/material/dialog";
import {ServiceTemplateDatasource} from "../../../datasources/service-template.datasource";
import {Instrument} from "../../../models/instrument.model";
import {ServiceTemplate} from "../../../models/service-template.model";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {filter, Observable, switchMap} from "rxjs";
import {ServiceDatasource} from "../../../datasources/service.datasource";
import {Service} from "../../../models/service.model";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'ws-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent {

  constructor(
    private endpointsService: EndpointsService,
    public dialog: MatDialog,
    private snackBar: SnackbarService,
  ) {
    this.serviceDatasource = new ServiceDatasource(
      this.endpointsService,
    );
  }

  serviceDatasource: ServiceDatasource;
  displayedColumns = ['name', 'leader', 'date', 'actions'];
  loading$!: Observable<boolean>;

  ngOnInit() {
    this.loading$ = this.serviceDatasource.loading$;
    this.serviceDatasource.loadServices();
  }

  openDeleteDialog(service: Service) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'w-6',
      hasBackdrop: true,
    });

    ref
      .afterClosed()
      .pipe(
        filter((data) => data),
        switchMap(() =>
          this.endpointsService.deleteService(service._id),
        ),
      )
      .subscribe({
        next: () => {
          this.serviceDatasource.loadServices();
          this.snackBar.message('Служение было успешно удалено')
        },
        error: () => this.snackBar.error()
      });
  }
}
