import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InstrumentsListComponent } from './components/instruments/instruments-list/instruments-list.component';
import { InstrumentAddModalComponent } from './components/instruments/instrument-add-modal/instrument-add-modal.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatListModule } from '@angular/material/list';
import { ServiceTemplateListComponent } from './components/service-templates/service-template-list/service-template-list.component';
import { AddServiceTemplateModalComponent } from './components/service-templates/add-service-template-modal/add-service-template-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { ServiceListComponent } from './components/service/service-list/service-list.component';
import { AddNewServicePageComponent } from './components/service/add-new-service-page/add-new-service-page.component';
import { AddNewServiceFormComponent } from './components/service/add-new-service-form/add-new-service-form.component';
import { ServiceViewPageComponent } from './components/service/service-view-page/service-view-page.component';
import { PeopleListComponent } from './components/people/people-list/people-list.component';
import { AddPeopleModalComponent } from './components/people/add-people-modal/add-people-modal.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { SelectInstrumentDropdownComponent } from './components/select-instrument-dropdown/select-instrument-dropdown.component';
import { ServiceInstrumentConfigComponent } from './components/service-instrument-config/service-instrument-config.component';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
} from '@angular/material-moment-adapter';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { TimetableComponent } from './components/timetable/timetable.component';
import { TimetableRowComponent } from './components/timetable-row/timetable-row.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SnackbarService} from "./services/snackbar.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { AddServiceChooseTemplateModalComponent } from './components/service/add-service-choose-template/add-service-choose-template-modal.component';

const routes: Routes = [
  {
    path: 'instruments',
    component: InstrumentsListComponent,
  },
  {
    path: 'templates',
    component: ServiceTemplateListComponent,
  },
  {
    path: 'services',
    component: ServiceListComponent,
  },
  {
    path: 'services/add',
    component: AddNewServicePageComponent,
  },
  {
    path: 'services/:id/edit',
    component: AddNewServicePageComponent,
  },
  {
    path: 'services/:id',
    component: ServiceViewPageComponent,
  },
  {
    path: 'people',
    component: PeopleListComponent,
  },
  {
    path: 'timetable',
    component: TimetableComponent,
  },
];

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    InstrumentsListComponent,
    InstrumentAddModalComponent,
    ConfirmDialogComponent,
    ServiceTemplateListComponent,
    AddServiceTemplateModalComponent,
    ServiceListComponent,
    AddNewServicePageComponent,
    AddNewServiceFormComponent,
    ServiceViewPageComponent,
    PeopleListComponent,
    AddPeopleModalComponent,
    SelectInstrumentDropdownComponent,
    ServiceInstrumentConfigComponent,
    TimetableComponent,
    TimetableRowComponent,
    LoadingIndicatorComponent,
    AddServiceChooseTemplateModalComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
    MatSelectModule,
    MatGridListModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatProgressSpinnerModule,
    FormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: MAT_DATE_LOCALE, useValue: 'ru-ru' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    SnackbarService,
    MatSnackBar,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
