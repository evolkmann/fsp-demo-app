import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { FirebaseCollection } from 'src/app/firebase';
import { CreateEmployeeDialogComponent, CreateEmployeeDialogInput } from '../../components/create-employee-dialog/create-employee-dialog.component';
import { Clinic } from '../../models/clinic.model';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'fsp-clinic-detail',
  templateUrl: './clinic-detail.component.html',
  styleUrls: ['./clinic-detail.component.scss']
})
export class ClinicDetailComponent implements OnInit {

  clinic!: Observable<Clinic | undefined>;
  private readonly docRef = new BehaviorSubject<AngularFirestoreDocument<Clinic> | undefined>(undefined);
  employees!: Observable<Employee[]>;

  selectedEmployees: string[] = [];

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly route: ActivatedRoute,
    private readonly meta: MetaService,
    private readonly matDialog: MatDialog
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
  }

  openCreateEmployeeDialog() {
    this.matDialog.open<
      CreateEmployeeDialogComponent,
      CreateEmployeeDialogInput
    >(CreateEmployeeDialogComponent, {
      minWidth: '50%',
      minHeight: '200px',
      data: {
        clinic: this.docRef.value!
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

}
