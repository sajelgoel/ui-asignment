import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FlightsComponent } from '../../../components/home/flights/flights.component';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

describe('Flight component', () => {
  let fixture: ComponentFixture<FlightsComponent>;

  let router;
  let translateService;
  let formBuilder: FormBuilder;

  class TestRouter {
    navigate(): number {
      return 0;
    }
  }

  class TestTranslate {
    sub = new BehaviorSubject(['test']);

    onLangChangeSub = new Subject();
    onLangChange = this.onLangChangeSub.asObservable();

    get(): Observable<Array<string>> {
      return this.sub.asObservable();
    }
  }

  beforeEach(
    waitForAsync(() => {
      router = new TestRouter();
      translateService = new TestTranslate();
      formBuilder = new FormBuilder();

      TestBed.configureTestingModule({
        declarations: [FlightsComponent],
        imports: [TranslateModule.forRoot(), ReactiveFormsModule],
        providers: [
          { provide: Router, useValue: router },
          { provide: TranslateService, useValue: translateService },
          { provide: FormBuilder, useValue: formBuilder },
        ],
      });
      fixture = TestBed.createComponent(FlightsComponent);
      sessionStorage.removeItem('flightSearch');
      fixture.componentInstance.ngOnInit();
    })
  );

  it('sessionvalue is null ', () => {
    expect(fixture.componentInstance.sessionValue).toBeNull();
  });

  it('sessionvalue.name is test ', () => {
    const sessionObj = {
      departure: 'test',
      destination: 'test',
      departDate: 'test',
      returnDate: 'test',
      traveler: 'test',
      class: 'test',
    };
    sessionStorage.setItem('flightSearch', JSON.stringify(sessionObj));
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.sessionValue.departure).toEqual('test');
  });

  it('form is valid', () => {
    fixture.componentInstance.myForm.setValue({
      departure: 'test',
      destination: 'test',
      departDate: 'test',
      returnDate: 'test',
      traveler: 'test',
      class: 'test',
    });
    expect(fixture.componentInstance.myForm.valid).toBeTrue();
  });

  it('form is invalid', () => {
    fixture.componentInstance.myForm.setValue({
      departure: '',
      destination: 'test',
      departDate: 'test',
      returnDate: 'test',
      traveler: 'test',
      class: 'test',
    });
    expect(fixture.componentInstance.myForm.invalid).toBeTrue();
  });

  it('value is stored in session on click of submit', () => {
    const sessionObj = {
      departure: 'test',
      destination: 'test',
      departDate: 'test',
      returnDate: 'test',
      traveler: 'test',
      class: 'test',
    };
    fixture.componentInstance.myForm.setValue(sessionObj);
    fixture.componentInstance.onSubmit(fixture.componentInstance.myForm);
    expect(sessionStorage.getItem('flightSearch')).toEqual(
      JSON.stringify(sessionObj)
    );
  });
});
