import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import { parse } from 'json2csv';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/auth/services/user.service';
import { CreateEmployeeDialogComponent, CreateEmployeeInput } from 'src/app/employees/components/create-employee-dialog/create-employee-dialog.component';
import { CreateEventDialogComponent, CreateEventInput } from 'src/app/events/components/create-event-dialog/create-event-dialog.component';
import { FirebaseCollection } from 'src/app/firebase';
import { Event, EventField } from 'src/app/shared/models/event.model';
import { Clinic } from '../../../shared/models/clinic.model';
import { Employee } from '../../../shared/models/employee.model';
import { download } from '../../../utils';

@Component({
  selector: 'fsp-clinic-detail',
  templateUrl: './clinic-detail.component.html',
  styleUrls: ['./clinic-detail.component.scss']
})
export class ClinicDetailComponent implements OnInit {

  clinic!: Observable<Clinic | undefined>;
  private readonly docRef = new BehaviorSubject<AngularFirestoreDocument<Clinic> | undefined>(undefined);
  employees!: Observable<Employee[]>;
  events!: Observable<Event[]>;
  readonly eventFields = EventField;

  selectedEmployees: string[] = [];

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly route: ActivatedRoute,
    private readonly meta: MetaService,
    private readonly matDialog: MatDialog,
    public readonly user: UserService
  ) { }

  ngOnInit(): void {
    this.clinic = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => {
        const doc = this.firestore.doc<Clinic>(`${FirebaseCollection.CLINICS}/${id}`);
        this.docRef.next(doc);
        return doc.valueChanges({
          idField: 'id'
        })
      }),
      tap(clinic => this.meta.setTitle(`${clinic?.name} - Clinics`))
    );
    this.employees = this.docRef.pipe(
      filter(ref => !!ref),
      switchMap(doc => this.firestore.collection<Employee>(FirebaseCollection.EMPLOYEES, ref => ref.where('clinic', '==', doc!.ref)).valueChanges({
        idField: 'id'
      }))
    );
    this.events = this.docRef.pipe(
      filter(ref => !!ref),
      switchMap(doc => this.firestore.collection<Event>(FirebaseCollection.EVENTS, ref => ref.where('clinic', '==', doc!.ref)).valueChanges({
        idField: 'id'
      }))
    );
  }

  openCreateEmployeeDialog() {
    this.matDialog.open<
      CreateEmployeeDialogComponent,
      CreateEmployeeInput
    >(CreateEmployeeDialogComponent, {
      minWidth: '50%',
      minHeight: '200px',
      data: {
        mode: 'clinic',
        clinic: this.docRef.value!
      }
    });
  }

  openCreateEventDialog() {
    this.matDialog.open<
      CreateEventDialogComponent,
      CreateEventInput
    >(CreateEventDialogComponent, {
      minWidth: '50%',
      minHeight: '200px',
      data: {
        clinic: this.route.snapshot.params.id
      }
    });
  }

  onSelectionChange(change: MatSelectionListChange) {
    this.selectedEmployees = change.source.selectedOptions.selected.map(sel => sel.value)
  }

  async deleteEmployees() {
    const confirmed = confirm(`Do you want to delete the selected employees?`);
    if (!confirmed) {
      return;
    }

    for (const id of this.selectedEmployees) {
      await this.firestore.doc(`${FirebaseCollection.EMPLOYEES}/${id}`).delete();
    }

    this.selectedEmployees = [];
  }

  convertToCsvAndDownload(events: Event[]) {
    const data = events.map(evt => {
      const obj: any = {
        id: evt.id,
        timestamp: evt.timestamp.toDate().toISOString(),
        clinic: evt.clinic.id,
        employee: evt.employee.id
      };
      for (const { field, value } of evt.payload) {
        obj[`payload.${field}`] = value;
      }
      return obj;
    });
    const csv = parse(data);
    download('events.csv', csv, 'text/csv');
  }

}
