import { Pipe, PipeTransform } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

@Pipe({
  name: 'employeeName'
})
export class EmployeeNamePipe implements PipeTransform {

  transform(employee: DocumentReference<Employee>): Observable<string | undefined> {
    return from(employee.get()).pipe(
      map(emp => emp.data()?.name)
    )
  }

}
