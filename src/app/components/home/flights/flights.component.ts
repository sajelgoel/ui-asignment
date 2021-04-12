import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent implements OnInit {
  travelers: Array<string> = ['1 Adult', '2 Adult', '3 Adult'];
  classes: Array<string> = ['ECONOMY', 'BASIC', 'MAIN'];

  sessionValue!: FlightForm;
  tempClass = '';

  langChange$!: Observable<any>;

  myForm!: FormGroup;

  get departure(): AbstractControl | null {
    return this.myForm.get('departure');
  }

  get destination(): AbstractControl | null {
    return this.myForm.get('destination');
  }

  get departDate(): AbstractControl | null {
    return this.myForm.get('departDate');
  }

  get returnDate(): AbstractControl | null {
    return this.myForm.get('returnDate');
  }

  get traveler(): AbstractControl | null {
    return this.myForm.get('traveler');
  }

  get class(): AbstractControl | null {
    return this.myForm.get('class');
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.sessionValue = JSON.parse(sessionStorage.getItem('flightSearch')!);
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group(
      {
        departure: ['', [Validators.required, Validators.minLength(3)]],
        destination: ['', [Validators.required, Validators.minLength(3)]],
        departDate: ['', [Validators.required, this.departDateValidator()]],
        returnDate: ['', [Validators.required]],
        traveler: ['', [Validators.required]],
        class: ['', [Validators.required]],
      },
      { validator: this.returnDateValidator('departDate', 'returnDate') }
    );
    if (this.sessionValue) {
      this.myForm.setValue(this.sessionValue);
    }
  }

  departDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const date = new Date();
      return date > new Date(control.value)
        ? { invalidDate: { value: control.value } }
        : null;
    };
  }

  returnDateValidator(departDate: string, returnDate: string) {
    return (group: FormGroup) => {
      const dDate = group.controls[departDate];
      const rDate = group.controls[returnDate];
      if (rDate.value) {
        const date = new Date(rDate.value);
        const currentDate = new Date();
        const updateDepartDate = new Date(dDate.value);
        updateDepartDate.setDate(updateDepartDate.getDate() + 1);
        if (currentDate > date || updateDepartDate > date) {
          return rDate.setErrors({ invalidDate: true });
        }
        return rDate.setErrors(null);
      }
    };
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      sessionStorage.setItem('flightSearch', JSON.stringify(form.value));
      this.router.navigate(['flights']);
    }
  }
}

export interface FlightForm {
  departure: string;
  destination: string;
  departDate: string;
  returnDate: string;
  traveler: string;
  class: string;
}
