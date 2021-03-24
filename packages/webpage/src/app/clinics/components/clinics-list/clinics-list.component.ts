import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirebaseCollection } from 'src/app/firebase';
import { Clinic } from '../../../shared/models/clinic.model';

@Component({
  selector: 'fsp-clinics-list',
  templateUrl: './clinics-list.component.html',
  styleUrls: ['./clinics-list.component.scss']
})
export class ClinicsListComponent implements OnInit {

  clinics!: Observable<Clinic[]>;

  constructor(
    private readonly firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.clinics = this.firestore.collection<Clinic>(FirebaseCollection.CLINICS).valueChanges({
      idField: 'id'
    });
  }

}
