import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InstrumentsListComponent } from './components/instruments/instruments-list/instruments-list.component';
import { InstrumentAddModalComponent } from './components/instruments/instrument-add-modal/instrument-add-modal.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterModule, Routes} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatListModule} from "@angular/material/list";
import { ServiceTemplateListComponent } from './components/service-templates/service-template-list/service-template-list.component';
import { AddServiceTemplateModalComponent } from './components/service-templates/add-service-template-modal/add-service-template-modal.component';
import {MatSelectModule} from "@angular/material/select";
import {MatGridListModule} from "@angular/material/grid-list";

const routes: Routes = [{
  path: 'instruments',
  component: InstrumentsListComponent
}, {
  path: 'templates',
  component: ServiceTemplateListComponent
}]

@NgModule({
  declarations: [
    AppComponent,
    InstrumentsListComponent,
    InstrumentAddModalComponent,
    ConfirmDialogComponent,
    ServiceTemplateListComponent,
    AddServiceTemplateModalComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
