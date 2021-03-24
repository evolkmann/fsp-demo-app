import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmployeeIsCurrentUserPipe } from './pipes/employee-is-current-user.pipe';

@NgModule({
  declarations: [
    EmployeeIsCurrentUserPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EmployeeIsCurrentUserPipe
  ]
})
export class SharedModule { }
