import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { FirebaseCollection } from 'src/app/firebase';
import { Event } from 'src/app/shared/models/event.model';

@Component({
  selector: 'fsp-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  readonly displayedColumns = [
    'field',
    'value'
  ];

  event!: Observable<Event | undefined>

  constructor(
    private readonly route: ActivatedRoute,
    private readonly firestore: AngularFirestore,
    private readonly meta: MetaService
  ) { }

  ngOnInit(): void {
    this.event = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => {
        const doc = this.firestore.doc<Event>(`${FirebaseCollection.EVENTS}/${id}`);
        return doc.valueChanges({
          idField: 'id'
        })
      }),
      tap(event => this.meta.setTitle(`${event?.id} - Events`))
    );
  }

}
