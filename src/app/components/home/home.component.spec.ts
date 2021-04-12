import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightsComponent } from './flights/flights.component';
import { HomeComponent } from './home.component';
import { HotelsComponent } from './hotels/hotels.component';

describe('Home component', () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent],
    });
    fixture = TestBed.createComponent(HomeComponent);
    fixture.componentInstance.tabData = [
      {
        label: 'Flights',
        selected: true,
        component: FlightsComponent,
        icon: 'flight_takeoff',
      },
      {
        label: 'Hotels',
        selected: false,
        component: HotelsComponent,
        icon: 'domain',
      },
    ];
    fixture.componentInstance.ngOnInit();
  });

  it('tabData first element select property is true ', () => {
    expect(fixture.componentInstance.tabData[0].selected).toBeTrue();
  });

  it('after tabSelected function call, selected tab should be HotelComponent', () => {
    fixture.componentInstance.tabSelected(fixture.componentInstance.tabData[1]);
    expect(fixture.componentInstance.tabData[1].selected).toBeTrue();
  });
});
