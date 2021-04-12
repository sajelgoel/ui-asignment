import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabFactoryComponent } from './tab-factory.component';
import { FlightsComponent } from '../../../components/home/flights/flights.component';
import { HotelsComponent } from '../../../components/home/hotels/hotels.component';

describe('TabFactory component', () => {
  let fixture: ComponentFixture<TabFactoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabFactoryComponent],
    });
    fixture = TestBed.createComponent(TabFactoryComponent);
    fixture.componentInstance.tabs = [
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

  it('variable component value should be FlightComponent ', () => {
    expect(fixture.componentInstance.component).toEqual(FlightsComponent);
  });

  it('first label of tabs is value passed in it', () => {
    expect(fixture.componentInstance.tabs[0].label).toEqual('Flights');
  });

  it('after second tab selected, component should be HotelComponent', () => {
    fixture.componentInstance.tabselected(fixture.componentInstance.tabs[1]);
    expect(fixture.componentInstance.component).toEqual(HotelsComponent);
  });
});
