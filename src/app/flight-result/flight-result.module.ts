import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightResultRoutingModule } from './flight-result-routing.module';
import { SortComponent } from './components/flight-container/sort/sort.component';
import { FilterComponent } from './components/flight-container/filter/filter.component';
import { SearchResultComponent } from './components/flight-container/search-result/search-result.component';
import { FlightDetailsComponent } from './components/flight-container/search-result/flight-details/flight-details.component';
import { SharedModule } from '../shared/shared.module';
import { SortPipe } from './pipe/sort.pipe';
import { FilterPipe } from './pipe/filter.pipe';
import { FlightContainerComponent } from './components/flight-container/flight-container.component';

@NgModule({
  declarations: [
    SortComponent,
    FilterComponent,
    SearchResultComponent,
    FlightDetailsComponent,
    SortPipe,
    FilterPipe,
    FlightContainerComponent,
  ],
  imports: [
    CommonModule,
    FlightResultRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
    }),
  ],
})
export class FlightResultModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
