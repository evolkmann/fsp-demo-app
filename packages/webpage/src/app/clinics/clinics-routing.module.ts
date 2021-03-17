import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicDetailComponent } from './views/clinic-detail/clinic-detail.component';
import { OverviewComponent } from './views/overview/overview.component';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent
  },
  {
    path: ':id',
    component: ClinicDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicsRoutingModule { }
