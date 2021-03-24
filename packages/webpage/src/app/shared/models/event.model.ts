import { DocumentReference } from '@angular/fire/firestore';
import { Clinic } from './clinic.model';
import { Employee } from './employee.model';

interface EventPayload {
  field: string;
  value: any;
}

export interface Event {
  id?: string;
  payload: EventPayload[];
  timestamp: firebase.default.firestore.Timestamp;
  clinic: DocumentReference<Clinic>;
  employee: DocumentReference<Employee>;
}
