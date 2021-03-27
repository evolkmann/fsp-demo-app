import { DocumentReference } from '@angular/fire/firestore';
import { Clinic } from './clinic.model';
import { Employee } from './employee.model';

export enum EventField {
  WEIGHT = 'weight',
  PATIENT = 'patient',
  COVID_19_CASES = 'covid19-cases'
}

interface EventPayload {
  field: EventField;
  value: any;
}

export interface Event {
  id?: string;
  payload: EventPayload[];
  timestamp: firebase.default.firestore.Timestamp;
  clinic: DocumentReference<Clinic>;
  employee: DocumentReference<Employee>;
}
