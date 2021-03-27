import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeesModule } from '../employees/employees.module';
import { EventsModule } from '../events/events.module';
import { MaterialModule } from '../material.module';
import { NavigationModule } from '../navigation/navigation.module';
import { SharedModule } from '../shared/shared.module';
import { ClinicsRoutingModule } from './clinics-routing.module';
import { ClinicCardComponent } from './components/clinic-card/clinic-card.component';
import { ClinicsListComponent } from './components/clinics-list/clinics-list.component';
import { ClinicDetailComponent } from './views/clinic-detail/clinic-detail.component';
import { OverviewComponent } from './views/overview/overview.component';

@NgModule({
  declarations: [
    OverviewComponent,
    ClinicsListComponent,
    ClinicCardComponent,
    ClinicDetailComponent,
  ],
  imports: [
    CommonModule,
    ClinicsRoutingModule,
    AngularFirestoreModule,
    MaterialModule,
    RouterModule,
    NavigationModule,
    ReactiveFormsModule,
    SharedModule,
    EmployeesModule,
    EventsModule
  ]
})
export class ClinicsModule { }
