import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { take, tap } from 'rxjs/operators';
import { FirebaseCollection } from 'src/app/firebase';
import { Role } from 'src/app/shared/models/role.model';

@Component({
  selector: 'fsp-create-sales-rep-employee-dialog',
  templateUrl: './create-sales-rep-employee-dialog.component.html',
  styleUrls: ['./create-sales-rep-employee-dialog.component.scss']
})
export class CreateSalesRepEmployeeDialogComponent implements OnInit {

  readonly form = new FormGroup({
    name: new FormControl(null, Validators.required),
  })

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly dialogRef: MatDialogRef<CreateSalesRepEmployeeDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  async submit() {
    this.form.markAsPending();
    this.firestore.collection<Role>(FirebaseCollection.ROLES, ref => ref.where('defaultForSalesRep', '==', true)).valueChanges({
      idField: 'id'
    }).pipe(
      take(1),
      tap(async roles => {
        const roleRef = this.firestore.doc(`${FirebaseCollection.ROLES}/${roles[0].id}`).ref;
        const ref = await this.firestore.collection(FirebaseCollection.EMPLOYEES).add({
          ...this.form.value,
          role: roleRef
        });
        this.dialogRef.close();
      }),
    ).subscribe()
  }

}
