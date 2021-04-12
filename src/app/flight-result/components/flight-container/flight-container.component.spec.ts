import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { FlightService } from 'src/app/flight-result/services/flight.service';
import { I18nService } from 'src/app/shared/services/i18n.service';
import { FlightContainerComponent } from './flight-container.component';

class Service {
  filterBy = new BehaviorSubject({
    economy: false,
    firstClass: false,
    maximumPrice: 1000,
    minimumPrice: 100,
  });
  filterBy$ = this.filterBy.asObservable();
  constructor() {}

  setFilterBy(value: any): number {
    return 0;
  }
}

describe('Flight container component', () => {
  let fixture: ComponentFixture<FlightContainerComponent>;
  let flightService: Service;

  let i18nService;
  let translate;
  class TranslateServiceMock {
    use(val: string): string {
      return val;
    }
  }

  beforeEach(
    waitForAsync(() => {
      i18nService = new I18nService();
      flightService = new Service();
      translate = new TranslateServiceMock();

      TestBed.configureTestingModule({
        declarations: [FlightContainerComponent],
        imports: [TranslateModule.forRoot()],
        providers: [
          { provide: FlightService, useValue: flightService },
          { provide: I18nService, useValue: i18nService },
          { provide: TranslateService, useValue: translate },
        ],
      });
      fixture = TestBed.createComponent(FlightContainerComponent);

      fixture.componentInstance.ngOnInit();
    })
  );

  it('initial currentPage value', () => {
    expect(fixture.componentInstance.currentPage).toEqual('result');
  });
  it('currentPage value is filter', () => {
    fixture.componentInstance.gotoFilterPage();
    expect(fixture.componentInstance.currentPage).toEqual('filter');
  });
  it('currentPage value is sort', () => {
    fixture.componentInstance.gotoSortingPage();
    expect(fixture.componentInstance.currentPage).toEqual('sort');
  });
  it('currentPage value is result', () => {
    fixture.componentInstance.gotoSortingPage();
    fixture.componentInstance.showSearchPage();
    expect(fixture.componentInstance.currentPage).toEqual('result');
  });
});
