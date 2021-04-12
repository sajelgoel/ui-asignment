import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FlightResponse } from 'src/app/flight-result/interface/index.interface';

import { FlightService } from '../../../services/flight.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  @Input() airlineDetails!: FlightResponse;
  @Output() sortPage = new EventEmitter();
  @Output() filterPage = new EventEmitter();

  sortByVal = '';
  filterBy: any;

  constructor(private flightService: FlightService) {
    this.flightService.sortBy$.subscribe((res: any) => {
      this.sortByVal = res.sortBy;
    });

    this.flightService.filterBy$.subscribe((res) => {
      this.filterBy = res;
    });
  }

  ngOnInit(): void {}

  sortBy(): void {
    this.sortPage.emit();
  }

  filters(): void {
    this.filterPage.emit();
  }
}
