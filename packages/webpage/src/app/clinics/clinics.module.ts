import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { NavigationModule } from '../navigation/navigation.module';
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
    NavigationModule
  ]
})
export class ClinicsModule { }
