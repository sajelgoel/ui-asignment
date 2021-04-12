import { Pipe, PipeTransform } from '@angular/core';
import { Classes, FlightDetail } from '../interface/index.interface';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: FlightDetail[], params: any): Array<FlightDetail> {
    if (params) {
      let filterArray = value;
      if (params.economy) {
        filterArray = filterArray.filter((el) => {
          return el.classes[0].seatLeft > 0 || el.classes[2].seatLeft > 0;
        });
      }
      if (params.firstClass) {
        filterArray = filterArray.filter((el) => {
          return el.classes[1].seatLeft > 0;
        });
      }
      filterArray = filterArray.filter((val) => {
        let result = false;
        for (let index = 0; index < val.classes.length; index++) {
          if (
            val.classes[index].price >= params.minimumPrice &&
            val.classes[index].price <= params.maximumPrice
          ) {
            result = true;
            break;
          }
        }
        return result;
      });

      return filterArray;
    }

    return value;
  }
}
