import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Clinic } from './clinic.model';
import { Role } from './role.model';

export interface Employee {
  id: string;
  name: string;
  email?: string;
  clinic: AngularFirestoreDocument<Clinic>;
  role: AngularFirestoreDocument<Role>;
}
