import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import firebase from 'firebase';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/auth/services/user.service';
import { FirebaseCollection } from 'src/app/firebase';
import { Clinic } from 'src/app/shared/models/clinic.model';
import { Employee } from 'src/app/shared/models/employee.model';
import { Event, EventField } from 'src/app/shared/models/event.model';

export interface CreateEventInput {
  clinic: string;
}

@Component({
  selector: 'fsp-create-event-dialog',
  templateUrl: './create-event-dialog.component.html',
  styleUrls: ['./create-event-dialog.component.scss']
})
export class CreateEventDialogComponent implements OnInit {

  readonly fields = Object.values(EventField);
  readonly form = new FormGroup({
    employee: new FormControl(null),
    clinic: new FormControl(this.data.clinic, Validators.required),
    payload: new FormArray([], {
      validators: [
        this.uniquePayloadKeysValidator.bind(this)
      ]
    })
  })

  constructor(
    private readonly ref: MatDialogRef<CreateEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    readonly data: CreateEventInput,
    private readonly userService: UserService,
    private readonly firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.addRow();
  }

  async submit() {
    this.userService.employee.pipe(
      switchMap(async employee => {
        await this.firestore.collection<Event>(FirebaseCollection.EVENTS).add({
          employee: this.firestore.doc<Employee>(`${FirebaseCollection.EMPLOYEES}/${employee.id}`).ref,
          clinic:  this.firestore.doc<Clinic>(`${FirebaseCollection.CLINICS}/${this.data.clinic}`).ref,
          timestamp: firebase.firestore.Timestamp.now(),
          payload: this.form.value.payload
        });
        this.ref.close();
      })
    ).subscribe();
  }

  addRow() {
    (this.form.get('payload') as FormArray).push(
      new FormGroup({
        field: new FormControl(null, Validators.required),
        value: new FormControl(null, Validators.required)
      })
    );
  }

  private uniquePayloadKeysValidator(ctrl: AbstractControl): ValidationErrors | null {
    const arr = ctrl as FormArray;
    if (arr.length < 2) {
      return null;
    }

    const val = arr.value as {
      field: string;
      value: any;
    }[];
    const set = new Set(val.map(v => v.field));
    return set.size === val.length ? null : {
      fieldNamesMustBeUnique: true
    };
  }

}
