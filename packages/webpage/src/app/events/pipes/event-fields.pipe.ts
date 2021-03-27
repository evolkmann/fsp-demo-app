import { Pipe, PipeTransform } from '@angular/core';
import { Event } from 'src/app/shared/models/event.model';

@Pipe({
  name: 'eventFields'
})
export class EventFieldsPipe implements PipeTransform {

  transform(event: Event): string[] {
    return event.payload.map(p => p.field);
  }

}
