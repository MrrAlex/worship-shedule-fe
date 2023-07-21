import { Component } from '@angular/core';
import { EndpointsService } from '../../../services/endpoints.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { filter, firstValueFrom, Observable, switchMap } from 'rxjs';
import { ServiceTemplateDatasource } from '../../../datasources/service-template.datasource';
import { ServiceTemplate } from '../../../models/service-template.model';
import { AddServiceTemplateModalComponent } from '../add-service-template-modal/add-service-template-modal.component';
import { Instrument } from '../../../models/instrument.model';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'ws-service-template-list',
  templateUrl: './service-template-list.component.html',
  styleUrls: ['./service-template-list.component.scss'],
})
export class ServiceTemplateListComponent {
  constructor(
    private endpointsService: EndpointsService,
    public dialog: MatDialog,
    private snackBar: SnackbarService,
  ) {
    this.serviceTemplateDatasource = new ServiceTemplateDatasource(
      this.endpointsService,
    );
  }

  serviceTemplateDatasource: ServiceTemplateDatasource;
  displayedColumns = ['name', 'description', 'actions'];
  instruments!: Instrument[];
  loading$!: Observable<boolean>;

  ngOnInit() {
    this.loading$ = this.serviceTemplateDatasource.loading$;
    this.serviceTemplateDatasource.loadTemplates();
    this.endpointsService.loadInstruments().subscribe((data) => {
      this.instruments = data;
    });
  }

  openDeleteDialog(template: ServiceTemplate) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        text: 'Вы уверены, что хотите удалить шаблон? Это действие отменить нельзя.'
      },
      hasBackdrop: true,
    });

    ref
      .afterClosed()
      .pipe(
        filter((data) => data),
        switchMap(() => this.endpointsService.deleteTemplate(template._id)),
      )
      .subscribe({
        next: () => {
          this.serviceTemplateDatasource.loadTemplates();
          this.snackBar.message('Шаблон был успешно удален');
        },
        error: () => this.snackBar.error(),
      });
  }

  async openAddInstrumentDialog(template?: ServiceTemplate) {
    const isEdit = !!template;
    const templateData = isEdit
      ? await firstValueFrom(this.endpointsService.loadTemplate(template._id))
      : null;
    const ref = this.dialog.open(AddServiceTemplateModalComponent, {
      data: {
        template: templateData,
        instruments: this.instruments,
        header: isEdit ? 'Изменить шаблон' : 'Добавить новый шаблон',
      },
      hasBackdrop: true,
    });

    ref
      .afterClosed()
      .pipe(
        filter((data) => data),
        switchMap((data: ServiceTemplate) => {
          return isEdit
            ? this.endpointsService.updateTemplate(data._id, data)
            : this.endpointsService.addTemplate(data);
        }),
      )
      .subscribe({
        error: () => this.snackBar.error(),
        next: () => {
          this.serviceTemplateDatasource.loadTemplates();
          this.snackBar.message(
            isEdit
              ? 'Шаблон был успешно изменен'
              : 'Шаблон был успешно добавлен',
          );
        },
      });
  }
}
