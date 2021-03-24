import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take, tap } from 'rxjs/operators';
import { FirebaseCollection } from 'src/app/firebase';
import { Clinic } from '../../../shared/models/clinic.model';
import { Role } from '../../../shared/models/role.model';

export interface CreateEmployeeDialogInput {
  clinic: AngularFirestoreDocument<Clinic>;
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
    @Inject(MAT_DIALOG_DATA)
    private readonly data: CreateEmployeeDialogInput,
    private readonly dialogRef: MatDialogRef<CreateEmployeeDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  async submit() {
    this.form.markAsPending();
    this.firestore.collection<Role>(FirebaseCollection.ROLES, ref => ref.where('defaultForClinic', '==', true)).valueChanges({
      idField: 'id'
    }).pipe(
      take(1),
      tap(async roles => {
        const roleRef = this.firestore.doc(`${FirebaseCollection.ROLES}/${roles[0].id}`).ref;
        const ref = await this.firestore.collection(FirebaseCollection.EMPLOYEES).add({
          ...this.form.value,
          role: roleRef,
          clinic: this.data.clinic.ref
        });
        this.dialogRef.close();
      }),
    ).subscribe()
  }

}
