import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { FlightService } from 'src/app/flight-result/services/flight.service';
import { SearchResultComponent } from './search-result.component';

class Service {
  filterBy = new BehaviorSubject({
    economy: false,
    firstClass: false,
    maximumPrice: 1000,
    minimumPrice: 100,
  });
  filterBy$ = this.filterBy.asObservable();

  sortBy = new BehaviorSubject({ sortBy: 'test' });
  sortBy$ = this.sortBy.asObservable();
  constructor() {}
}

describe('Search-Result component', () => {
  let fixture: ComponentFixture<SearchResultComponent>;
  let flightService: Service;

  beforeEach(
    waitForAsync(() => {
      flightService = new Service();

      TestBed.configureTestingModule({
        declarations: [SearchResultComponent],
        imports: [TranslateModule.forRoot()],
        providers: [{ provide: FlightService, useValue: flightService }],
      });
      fixture = TestBed.createComponent(SearchResultComponent);

      fixture.componentInstance.ngOnInit();
    })
  );

  it('filterBy value', () => {
    const res = {
      economy: false,
      firstClass: false,
      maximumPrice: 1000,
      minimumPrice: 100,
    };
    expect(fixture.componentInstance.filterBy).toEqual(res);
  });

  it('sortBy value', () => {
    const res = {
      sortBy: 'test',
    };
    expect(fixture.componentInstance.sortByVal).toEqual(res.sortBy);
  });
});
