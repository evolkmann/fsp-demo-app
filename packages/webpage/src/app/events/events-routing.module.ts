import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailComponent } from './views/event-detail/event-detail.component';
import { VisualisationComponent } from './views/visualisation/visualisation.component';

const routes: Routes = [
  {
    path: 'visualise',
    component: VisualisationComponent
  },
  {
    path: ':id',
    component: EventDetailComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
