import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { I18nService } from 'src/app/shared/services/i18n.service';
import { FlightResponse } from '../../interface/index.interface';
import { FlightService } from '../../services/flight.service';

@Component({
  selector: 'app-flight-container',
  templateUrl: './flight-container.component.html',
  styleUrls: ['./flight-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightContainerComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private i18n: I18nService,
    private flightService: FlightService
  ) {
    this.i18n.currentLanguage$.subscribe((res) => {
      translate.use(res);
    });
  }

  airlineDetails$!: Observable<FlightResponse>;

  currentPage = 'result';

  ngOnInit(): void {
    this.airlineDetails$ = this.flightService.getFlights$;
  }

  gotoFilterPage(): void {
    this.currentPage = 'filter';
  }

  gotoSortingPage(): void {
    this.currentPage = 'sort';
  }

  showSearchPage(): void {
    this.currentPage = 'result';
  }
}
