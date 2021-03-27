import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take, tap } from 'rxjs/operators';
import { FirebaseCollection } from 'src/app/firebase';
import { Clinic } from 'src/app/shared/models/clinic.model';
import { Role } from 'src/app/shared/models/role.model';

export interface CreateEmployeeInput {
  mode: 'sales-rep' | 'clinic';
  clinic?: AngularFirestoreDocument<Clinic>;
}

@Component({
  selector: 'fsp-create-employee-dialog',
  templateUrl: './create-employee-dialog.component.html',
  styleUrls: ['./create-employee-dialog.component.scss']
})
export class CreateEmployeeDialogComponent implements OnInit {

  readonly form = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.email)
  })

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly dialogRef: MatDialogRef<CreateEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    readonly data: CreateEmployeeInput
  ) { }

  ngOnInit(): void {
    if (this.data.mode === 'clinic' && !this.data.clinic) {
      throw new Error(`clinic must be provided in mode ${this.data.mode}`);
    }
  }

  async submit() {
    this.form.markAsPending();
    this.firestore.collection<Role>(FirebaseCollection.ROLES, ref => {
      const field = this.data.mode === 'clinic' ? 'defaultForClinic' : 'defaultForSalesRep';
      return ref.where(field, '==', true);
    }).valueChanges({
      idField: 'id'
    }).pipe(
      take(1),
      tap(async roles => {
        const roleRef = this.firestore.doc(`${FirebaseCollection.ROLES}/${roles[0].id}`).ref;
        const payload = {
          ...this.form.value,
          role: roleRef
        };
        if (this.data.mode === 'clinic') {
          payload.clinic = this.data.clinic?.ref
        }
        const ref = await this.firestore.collection(FirebaseCollection.EMPLOYEES).add(payload);
        this.dialogRef.close();
      }),
    ).subscribe()
  }

}
