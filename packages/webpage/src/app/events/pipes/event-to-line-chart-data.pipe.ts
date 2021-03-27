import { Pipe, PipeTransform } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Event, EventField } from 'src/app/shared/models/event.model';

@Pipe({
  name: 'eventToLineChartData'
})
export class EventToLineChartDataPipe implements PipeTransform {

  transform(events: Event[] | null, field: EventField, groupBy?: EventField): ChartDataSets[] {
    if (!Array.isArray(events)) {
      return [];
    }

    let setNames = new Set<string>([field]);
    if (groupBy) {
      setNames = new Set<string>(events.map(e => e.payload.find(p => p.field === groupBy)?.value));
    }

    const sets: ChartDataSets[] = [];
    setNames.forEach(label => {
      sets.push({
        label,
        data: events
          .filter(event => groupBy ? event.payload.find(p => p.field === groupBy)?.value === label : true)
          .map(event => event.payload.find(p => p.field === field)?.value)
      })
    });

    return sets;
  }

}
