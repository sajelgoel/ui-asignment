import { Pipe, PipeTransform } from '@angular/core';
import { FlightDetail } from '../interface/index.interface';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: FlightDetail[], sortBy: string): FlightDetail[] {
    if (sortBy === '1' || sortBy === '2') {
      value.sort((a, b) => (a.classes[0].price < b.classes[0].price ? -1 : 1));
      return sortBy === '1' ? value : value.reverse();
    }

    if (sortBy === '3' || sortBy === '4') {
      value.sort((a, b) => {
        return a.totalTime.localeCompare(b.totalTime, undefined, {
          numeric: true,
          sensitivity: 'base',
        });
      });
      return sortBy === '3' ? value : value.reverse();
    }

    if (sortBy === '5') {
      value.sort((a, b) => {
        const timeA = new Date(a.fromTime).getTime();
        const timeB = new Date(b.fromTime).getTime();
        return timeA < timeB ? -1 : 1;
      });
      return value;
    }

    if (sortBy === '6') {
      value.sort((a, b) => {
        const timeA = new Date(a.toTime).getTime();
        const timeB = new Date(b.toTime).getTime();
        return timeA < timeB ? -1 : 1;
      });
      return value;
    }

    if (sortBy === '7' || sortBy === '8') {
      value.sort((a, b) => (a.name < b.name ? -1 : 1));
      return sortBy === '7' ? value : value.reverse();
    }

    return value;
  }
}
