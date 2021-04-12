import { inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FlightService } from './flight.service';

describe('FlightService', () => {
  let httpTestingController: HttpTestingController;
  let heroService: FlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlightService],
    });
    httpTestingController = TestBed.get(HttpTestingController);

    heroService = TestBed.get(FlightService);
  });

  it('check setfilterby ', inject(
    [FlightService, HttpTestingController],
    (service: FlightService, controller: HttpTestingController) => {
      service.setFilterBy('1');
      let val = '';
      service.filterBy$.subscribe((res) => {
        val = res;
      });

      expect(val).toEqual('1');
    }
  ));

  it('check setSortby ', inject(
    [FlightService, HttpTestingController],
    (service: FlightService, controller: HttpTestingController) => {
      service.setSortBy('2');
      let val = '';
      service.sortBy$.subscribe((res) => {
        val = res;
      });

      expect(val).toEqual('2');
    }
  ));
});
