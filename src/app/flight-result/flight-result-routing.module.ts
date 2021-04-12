import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightContainerComponent } from './components/flight-container/flight-container.component';

const routes: Routes = [
  {
    path: '',
    component: FlightContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlightResultRoutingModule {}
