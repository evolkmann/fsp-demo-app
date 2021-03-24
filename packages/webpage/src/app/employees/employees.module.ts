import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { CreateSalesRepEmployeeDialogComponent } from './components/create-sales-rep-employee-dialog/create-sales-rep-employee-dialog.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { OverviewComponent } from './views/overview/overview.component';

@NgModule({
  declarations: [
    OverviewComponent,
    EmployeesListComponent,
    CreateSalesRepEmployeeDialogComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    EmployeesListComponent
  ]
})
export class EmployeesModule { }
