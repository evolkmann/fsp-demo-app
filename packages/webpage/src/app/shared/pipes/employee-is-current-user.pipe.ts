import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

@Pipe({
  name: 'employeeIsCurrentUser'
})
export class EmployeeIsCurrentUserPipe implements PipeTransform {

  constructor(
    private readonly auth: AngularFireAuth
  ) {}

  transform(employee: Employee): Observable<boolean> {
    return this.auth.user.pipe(
      map(user => user?.email === employee?.email)
    );
  }

}
