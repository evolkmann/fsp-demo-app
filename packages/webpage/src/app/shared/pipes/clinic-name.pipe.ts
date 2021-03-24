import { Pipe, PipeTransform } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Clinic } from '../models/clinic.model';

@Pipe({
  name: 'clinicName'
})
export class ClinicNamePipe implements PipeTransform {

  transform(clinic: DocumentReference<Clinic>): Observable<string | undefined> {
    return from(clinic.get()).pipe(
      map(cl => cl.data()?.name)
    )
  }

}
