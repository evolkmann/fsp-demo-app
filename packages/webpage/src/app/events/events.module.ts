import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { NavigationModule } from '../navigation/navigation.module';
import { SharedModule } from '../shared/shared.module';
import { CreateEventDialogComponent } from './components/create-event-dialog/create-event-dialog.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventsRoutingModule } from './events-routing.module';
import { EventDetailComponent } from './views/event-detail/event-detail.component';

@NgModule({
  declarations: [
    CreateEventDialogComponent,
    EventsListComponent,
    EventDetailComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    NavigationModule
  ],
  exports: [
    CreateEventDialogComponent,
    EventsListComponent
  ]
})
export class EventsModule { }
