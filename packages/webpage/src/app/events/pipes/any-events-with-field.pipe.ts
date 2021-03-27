import { Pipe, PipeTransform } from '@angular/core';
import { Event, EventField } from 'src/app/shared/models/event.model';

@Pipe({
  name: 'anyEventsWithField'
})
export class AnyEventsWithFieldPipe implements PipeTransform {

  transform(events: Event[] | null, field: EventField): boolean {
    if (!Array.isArray(events)) {
      return false;
    }

    return events.filter(event => event.payload.some(p => p.field === field))?.length > 0;
  }

}
