import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RehearsalRoutingModule } from './rehearsal-routing.module';
import { RehearsalPageComponent } from './components/rehearsal-page/rehearsal-page.component';
import { AddRehearsalModalComponent } from './components/add-rehearsal-modal/add-rehearsal-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../shared/shared.module';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [RehearsalPageComponent, AddRehearsalModalComponent],
  imports: [
    CommonModule,
    RehearsalRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    SharedModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class RehearsalModule {}
