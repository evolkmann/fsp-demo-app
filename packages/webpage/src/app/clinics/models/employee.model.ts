import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Clinic } from './clinic.model';

export interface Employee {
  id: string;
  name: string;
  clinic: AngularFirestoreDocument<Clinic>;
}
