import { Component, OnInit } from '@angular/core';
import { ActivityComponent } from './activity/activity.component';
import { CarsComponent } from './cars/cars.component';
import { FlightsComponent } from './flights/flights.component';
import { HotelsComponent } from './hotels/hotels.component';
import { Tabs } from '../../shared/components/tab-factory/tab-factory.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tabData: Array<Tabs> = [
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
    {
      label: 'Cars',
      selected: false,
      component: CarsComponent,
      icon: 'domain',
    },
    {
      label: 'Activity',
      selected: false,
      component: ActivityComponent,
      icon: 'domain',
    },
  ];

  constructor() {}
  ngOnInit(): void {}

  tabSelected(tab: Tabs): void {
    this.tabData.map((val) => {
      val.selected = val.label === tab.label ? true : false;
    });
  }
}
