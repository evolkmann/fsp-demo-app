import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
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
    private readonly route: ActivatedRoute,
    private readonly meta: MetaService
  ) { }

  ngOnInit(): void {
    this.clinic = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.firestore.doc<Clinic>(`${FirebaseCollection.CLINICS}/${id}`).valueChanges({
        idField: 'id'
      })),
      tap(clinic => this.meta.setTitle(`${clinic?.name} - Clinics`))
    );
  }

}
