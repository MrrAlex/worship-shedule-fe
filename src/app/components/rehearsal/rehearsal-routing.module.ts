import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RehearsalPageComponent } from './components/rehearsal-page/rehearsal-page.component';

const routes: Routes = [
  {
    path: '',
    component: RehearsalPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RehearsalRoutingModule {}
