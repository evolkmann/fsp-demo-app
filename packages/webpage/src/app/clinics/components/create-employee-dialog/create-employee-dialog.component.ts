import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseCollection } from 'src/app/firebase';
import { Clinic } from '../../models/clinic.model';

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
    name: new FormControl(null, Validators.required)
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
    const ref = await this.firestore.collection(FirebaseCollection.EMPLOYEES).add({
      ...this.form.value,
      clinic: this.data.clinic.ref
    });
    this.dialogRef.close();
  }

}
