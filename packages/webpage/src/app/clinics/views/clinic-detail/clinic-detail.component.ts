import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FirebaseCollection } from 'src/app/firebase';
import { Clinic } from '../../models/clinic.model';

@Component({
  selector: 'fsp-clinic-detail',
  templateUrl: './clinic-detail.component.html',
  styleUrls: ['./clinic-detail.component.scss']
})
export class ClinicDetailComponent implements OnInit {

  clinic!: Observable<Clinic | undefined>

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.clinic = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.firestore.doc<Clinic>(`${FirebaseCollection.CLINICS}/${id}`).valueChanges({
        idField: 'id'
      }))
    );
  }

}
