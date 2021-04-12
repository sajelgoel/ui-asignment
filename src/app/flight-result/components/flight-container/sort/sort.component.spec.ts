import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { SortComponent } from './sort.component';
import { FlightService } from 'src/app/flight-result/services/flight.service';

describe('Sort Component', () => {
  let fixture: ComponentFixture<SortComponent>;

  let flightService;

  class TestService {
    private sortBy = new BehaviorSubject('');
    sortBy$ = this.sortBy.asObservable();
    setSortBy(value: string): void {
      this.sortBy.next(value);
    }
  }

  beforeEach(() => {
    flightService = new TestService();

    TestBed.configureTestingModule({
      declarations: [SortComponent],
      imports: [TranslateModule.forRoot()],
      providers: [{ provide: FlightService, useValue: flightService }],
    });

    fixture = TestBed.createComponent(SortComponent);

    fixture.componentInstance.ngOnInit();
  });

  it('form is invalid', () => {
    expect(fixture.componentInstance.form.invalid).toBeTrue();
  });

  it('form is valid', () => {
    fixture.componentInstance.form.setValue({ sortBy: '2' });
    expect(fixture.componentInstance.form.valid).toBeTrue();
  });

  it('form is submitted', () => {
    fixture.componentInstance.form.setValue({ sortBy: '3' });
    fixture.componentInstance.submit();
    const result = fixture.componentInstance.form.get('sortBy')?.value;
    expect('3').toEqual(result);
  });
});
