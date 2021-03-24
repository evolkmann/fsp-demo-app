import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/shared/models/event.model';

@Component({
  selector: 'fsp-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  @Input()
  events?: Event[];

  constructor() { }

  ngOnInit(): void {
  }

}
