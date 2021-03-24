import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  private readonly datePipe = new DatePipe('en');

  transform(timestamp: firebase.firestore.Timestamp): string {
    return this.datePipe.transform(timestamp.toDate(), 'long')!;
  }

}
