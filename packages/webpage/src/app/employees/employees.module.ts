import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { CreateEmployeeDialogComponent } from './components/create-employee-dialog/create-employee-dialog.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { OverviewComponent } from './views/overview/overview.component';

@NgModule({
  declarations: [
    OverviewComponent,
    EmployeesListComponent,
    CreateEmployeeDialogComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    EmployeesListComponent,
    CreateEmployeeDialogComponent
  ]
})
export class EmployeesModule { }
