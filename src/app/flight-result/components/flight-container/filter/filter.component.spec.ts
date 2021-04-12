import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { FlightService } from 'src/app/flight-result/services/flight.service';
import { FilterComponent } from './filter.component';

class Service {
  filterBy = new BehaviorSubject({
    economy: false,
    firstClass: false,
    maximumPrice: 1000,
    minimumPrice: 100,
  });
  filterBy$ = this.filterBy.asObservable();
  constructor() {}

  setFilterBy(value: any): void {}
}

describe('Filter component', () => {
  let fixture: ComponentFixture<FilterComponent>;
  let flightService: Service;

  let fb: FormBuilder;

  beforeEach(
    waitForAsync(() => {
      fb = new FormBuilder();
      flightService = new Service();

      TestBed.configureTestingModule({
        declarations: [FilterComponent],
        imports: [TranslateModule.forRoot(), ReactiveFormsModule],
        providers: [
          { provide: FlightService, useValue: flightService },
          { provide: FormBuilder, useValue: fb },
        ],
      });
      fixture = TestBed.createComponent(FilterComponent);

      fixture.componentInstance.ngOnInit();

      fixture.detectChanges();
    })
  );

  it('form is valid', () => {
    expect(fixture.componentInstance.form.valid).toBeTrue();
  });

  it('minimum value is 100', () => {
    expect(fixture.componentInstance.minimumPrice?.value).toEqual(100);
  });

  it('maximum value is 1000', () => {
    expect(fixture.componentInstance.maximumPrice?.value).toEqual(1000);
  });

  it('reset is working', () => {
    fixture.componentInstance.form.patchValue({ minimumPrice: 120 });
    fixture.componentInstance.resetAll();
    expect(fixture.componentInstance.minimumPrice?.value).toEqual(100);
  });

  it('invalid minimum price', () => {
    fixture.componentInstance.form.patchValue({ minimumPrice: 10 });
    expect(fixture.componentInstance.minimumPrice?.invalid).toBeTrue();
  });

  it('invalid maximum price', () => {
    fixture.componentInstance.form.patchValue({ maximumPrice: 1010 });
    expect(fixture.componentInstance.maximumPrice?.invalid).toBeTrue();
  });

  it('invalid date range maximum price', () => {
    fixture.componentInstance.form.patchValue({
      maximumPrice: 900,
      minimumPrice: 950,
    });

    expect(
      fixture.componentInstance.maximumPrice?.errors?.invalidRange
    ).toBeTrue();
  });

  it('invalid date range minimum price', () => {
    fixture.componentInstance.form.patchValue({
      maximumPrice: 800,
      minimumPrice: 950,
    });
    expect(
      fixture.componentInstance.minimumPrice?.errors?.invalidRange
    ).toBeTrue();
  });

  it('set left value of range', () => {
    fixture.componentInstance.setLeftValue();

    expect(
      fixture.componentInstance.thumbLeft.nativeElement.style.left
    ).toEqual('0%');
  });

  it('set right value of range', () => {
    fixture.componentInstance.setRightValue();

    expect(
      fixture.componentInstance.thumbRight.nativeElement.style.right
    ).toEqual('0%');
  });
});
