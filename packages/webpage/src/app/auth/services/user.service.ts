import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FirebaseCollection } from 'src/app/firebase';
import { Employee } from 'src/app/shared/models/employee.model';
import { Role } from 'src/app/shared/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly user!: Observable<firebase.default.User | null>;
  readonly employee?: Observable<Employee>;
  readonly role?: Observable<Role | undefined>;
  readonly isAdmin: Observable<boolean>;

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly firestore: AngularFirestore
  ) {
    this.user = this.auth.user;
    this.employee = this.user.pipe(
      switchMap(user => this.firestore.collection<Employee>(FirebaseCollection.EMPLOYEES, ref => ref.where('email', '==', user?.email)).valueChanges()),
      map(e => e[0])
    );
    this.role = this.employee.pipe(
      switchMap(emp => emp.role.get()),
      map(snap => snap.data())
    );
    this.isAdmin = this.role.pipe(
      map(role => !!role?.isAdmin)
    )
  }
}
