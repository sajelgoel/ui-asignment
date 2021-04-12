import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { FlightResponse } from '../interface/index.interface';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private sortBy = new BehaviorSubject('');
  sortBy$ = this.sortBy.asObservable();

  private filterBy = new BehaviorSubject('');
  filterBy$ = this.filterBy.asObservable();

  constructor(private http: HttpClient) {}

  getFlights$ = this.http.get<FlightResponse>(
    'assets/mock/getFlightDetails.json',
    {
      params: {
        ...JSON.parse(sessionStorage.getItem('flightSearch')!),
      },
    }
  );

  setSortBy(value: string): void {
    this.sortBy.next(value);
  }

  setFilterBy(value: string): void {
    this.filterBy.next(value);
  }
}
