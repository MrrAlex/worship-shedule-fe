import { Component } from '@angular/core';
import { EndpointsService } from '../../../services/endpoints.service';
import { MatDialog } from '@angular/material/dialog';
import { ServiceTemplate } from '../../../models/service-template.model';
import { filter, Observable, switchMap } from 'rxjs';
import { ServiceDatasource } from '../../../datasources/service.datasource';
import { Service } from '../../../models/service.model';
import { SnackbarService } from '../../../services/snackbar.service';
import { AddServiceChooseTemplateModalComponent } from '../add-service-choose-template/add-service-choose-template-modal.component';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ws-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
})
export class ServiceListComponent {
  constructor(
    private endpointsService: EndpointsService,
    public dialog: MatDialog,
    private snackBar: SnackbarService,
    private router: Router,
  ) {
    this.serviceDatasource = new ServiceDatasource(this.endpointsService);
  }

  serviceDatasource: ServiceDatasource;
  displayedColumns = ['name', 'leader', 'date', 'actions'];
  loading$!: Observable<boolean>;

  templates!: ServiceTemplate[];

  ngOnInit() {
    this.loading$ = this.serviceDatasource.loading$;
    this.serviceDatasource.loadServices();

    this.endpointsService.loadTemplates().subscribe((data) => {
      this.templates = data;
    });
  }

  openDeleteDialog(service: Service) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        text: 'Вы уверены, что хотите удалить служение? Это действие отменить нельзя.',
      },
      hasBackdrop: true,
    });

    ref
      .afterClosed()
      .pipe(
        filter((data) => data),
        switchMap(() => this.endpointsService.deleteService(service._id)),
      )
      .subscribe({
        next: () => {
          this.serviceDatasource.loadServices();
          this.snackBar.message('Служение было успешно удалено');
        },
        error: () => this.snackBar.error(),
      });
  }

  openTemplateDialog() {
    const ref = this.dialog.open(AddServiceChooseTemplateModalComponent, {
      data: {
        header: 'Создание нового служения',
        templates: this.templates,
      },
      hasBackdrop: true,
    });

    ref
      .afterClosed()
      .pipe(filter((data) => data))
      .subscribe({
        next: (templateId) => {
          this.router.navigate(['/', 'services', 'add'], {
            queryParams: { templateId },
          });
        },
        error: () => this.snackBar.error(),
      });
  }
}
