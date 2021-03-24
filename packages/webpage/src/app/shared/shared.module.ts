import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClinicNamePipe } from './pipes/clinic-name.pipe';
import { EmployeeIsCurrentUserPipe } from './pipes/employee-is-current-user.pipe';
import { EmployeeNamePipe } from './pipes/employee-name.pipe';
import { TimestampPipe } from './pipes/timestamp.pipe';

@NgModule({
  declarations: [
    EmployeeIsCurrentUserPipe,
    TimestampPipe,
    EmployeeNamePipe,
    ClinicNamePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EmployeeIsCurrentUserPipe,
    TimestampPipe,
    EmployeeNamePipe,
    ClinicNamePipe
  ]
})
export class SharedModule { }
