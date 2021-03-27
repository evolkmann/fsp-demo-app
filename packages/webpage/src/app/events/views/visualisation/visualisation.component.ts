import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseCollection } from 'src/app/firebase';
import { Clinic } from 'src/app/shared/models/clinic.model';
import { Event } from 'src/app/shared/models/event.model';

@Component({
  selector: 'fsp-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.scss']
})
export class VisualisationComponent implements OnInit {

  events!: Observable<Event[]>;

  field!: string;
  clinicId!: string;
  groupBy?: string;

  lineChartOptions: (ChartOptions & { annotation?: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    }
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  lineChartLegend = true;
  lineChartType: ChartType = 'line';

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly route: ActivatedRoute,
    private readonly meta: MetaService,
  ) { }

  ngOnInit(): void {
    this.meta.setTitle(`Event Visualisation`);

    this.clinicId = this.route.snapshot.queryParams.clinic;
    const clinicRef = this.firestore.doc<Clinic>(`${FirebaseCollection.CLINICS}/${this.clinicId}`).ref;

    this.field = this.route.snapshot.queryParams.field;
    this.groupBy = this.route.snapshot.queryParams.groupBy;

    this.events = this.firestore.collection<Event>(FirebaseCollection.EVENTS, ref => ref.where('clinic', '==', clinicRef)).valueChanges({
      idField: 'id'
    }).pipe(
      map(events => events.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds))
    );
  }

}
