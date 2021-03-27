import { Pipe, PipeTransform } from '@angular/core';
import { Label } from 'ng2-charts';
import { Event } from 'src/app/shared/models/event.model';
import { groupBy } from 'src/app/utils';

@Pipe({
  name: 'eventToLineChartLabels'
})
export class EventToLineChartLabelsPipe implements PipeTransform {

  transform(events: Event[] | null, resolution = 'day'): Label[] {
    if (!Array.isArray(events)) {
      return []
    }

    let dates = events.map(event => event.timestamp.toDate());
    if (resolution === 'day') {
      return Object.keys(groupBy<Date>(dates, date => date.toDateString()));
    }

    return dates.map(e => e.toISOString());
  }

}
