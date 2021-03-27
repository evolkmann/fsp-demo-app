import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseCollection } from 'src/app/firebase';
import { Clinic } from '../models/clinic.model';

@Pipe({
  name: 'clinicName'
})
export class ClinicNamePipe implements PipeTransform {

  constructor(
    private readonly firestore: AngularFirestore
  ) {}

  transform(clinic: string | DocumentReference<Clinic>): Observable<string | undefined> {
    let docRef: DocumentReference<Clinic>;

    if (typeof clinic === 'string') {
      docRef = this.firestore.doc<Clinic>(`${FirebaseCollection.CLINICS}/${clinic}`).ref;
    } else {
      docRef = clinic;
    }

    return from(docRef.get()).pipe(
      map(cl => cl.data()?.name)
    );
  }

}
