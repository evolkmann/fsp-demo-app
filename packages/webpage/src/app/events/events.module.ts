import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from '../material.module';
import { NavigationModule } from '../navigation/navigation.module';
import { SharedModule } from '../shared/shared.module';
import { CreateEventDialogComponent } from './components/create-event-dialog/create-event-dialog.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventsRoutingModule } from './events-routing.module';
import { AnyEventsWithFieldPipe } from './pipes/any-events-with-field.pipe';
import { EventToLineChartDataPipe } from './pipes/event-to-line-chart-data.pipe';
import { EventToLineChartLabelsPipe } from './pipes/event-to-line-chart-labels.pipe';
import { EventDetailComponent } from './views/event-detail/event-detail.component';
import { VisualisationComponent } from './views/visualisation/visualisation.component';
import { EventFieldsPipe } from './pipes/event-fields.pipe';

@NgModule({
  declarations: [
    CreateEventDialogComponent,
    EventsListComponent,
    EventDetailComponent,
    VisualisationComponent,
    EventToLineChartDataPipe,
    EventToLineChartLabelsPipe,
    AnyEventsWithFieldPipe,
    EventFieldsPipe
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    NavigationModule,
    ChartsModule
  ],
  exports: [
    CreateEventDialogComponent,
    EventsListComponent,
    AnyEventsWithFieldPipe
  ]
})
export class EventsModule { }
