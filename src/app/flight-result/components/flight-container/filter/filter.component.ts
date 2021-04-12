import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FlightService } from '../../../services/flight.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, AfterViewInit {
  @ViewChild('range') range!: ElementRef;
  @ViewChild('thumbLeft') thumbLeft!: ElementRef;
  @ViewChild('thumbRight') thumbRight!: ElementRef;
  @ViewChild('inputLeft') inputLeft!: ElementRef;
  @ViewChild('inputRight') inputRight!: ElementRef;

  form!: FormGroup;

  @Output() changePage = new EventEmitter();

  get minimumPrice(): AbstractControl | null {
    return this.form.get('minimumPrice');
  }

  get maximumPrice(): AbstractControl | null {
    return this.form.get('maximumPrice');
  }

  constructor(private fb: FormBuilder, private flightService: FlightService) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.flightService.filterBy$.subscribe((res: any) => {
      if (res) {
        this.form.setValue({
          ...res,
        });
        this.initialPriceBar(res);
      }
    });
  }

  initialPriceBar(res: any): void {
    let percent = ((res.minimumPrice - 100) / 1000) * 100 - 3;
    if (percent < 0) {
      percent = 0;
    }
    this.inputLeft.nativeElement.value = percent;
    this.thumbLeft.nativeElement.style.left = percent + '%';
    this.range.nativeElement.style.left = percent + '%';

    percent = (res.maximumPrice / 1000) * 100 + 3;
    if (percent > 100) {
      percent = 100;
    }
    this.inputRight.nativeElement.value = percent;
    this.thumbRight.nativeElement.style.right = 100 - percent + '%';
    this.range.nativeElement.style.right = 100 - percent + '%';
  }

  createForm(): void {
    this.form = this.fb.group(
      {
        minimumPrice: [100],
        maximumPrice: [1000],
        economy: [false],
        firstClass: [false],
      },
      { validator: [this.validatePriceRange('minimumPrice', 'maximumPrice')] }
    );
  }

  validatePriceRange(minimumPrice: string, maximumPrice: string) {
    return (group: FormGroup) => {
      const minPrice = group.controls[minimumPrice];
      const maxPrice = group.controls[maximumPrice];

      if (minPrice.value > maxPrice.value || minPrice.value < 100) {
        const minPriceValidation: any = {};
        if (minPrice.value > maxPrice.value) {
          minPriceValidation.invalidRange = true;
        }
        if (minPrice.value < 100) {
          this.form.patchValue({ minimumPrice: 100 });
        }
        minPrice.setErrors(minPriceValidation);
      } else {
        minPrice.setErrors(null);
      }

      if (minPrice.value > maxPrice.value || maxPrice.value > 1000) {
        const maxPriceValidation: any = {};
        if (minPrice.value > maxPrice.value) {
          maxPriceValidation.invalidRange = true;
        }
        if (maxPrice.value > 1000) {
          this.form.patchValue({ maximumPrice: 1000 });
        }
        maxPrice.setErrors(maxPriceValidation);
      } else {
        maxPrice.setErrors(null);
      }
    };
  }

  resetAll(): void {
    this.form.reset({
      minimumPrice: 100,
      maximumPrice: 1000,
      economy: false,
      firstClass: false,
    });

    this.inputLeft.nativeElement.value = 0;
    this.thumbLeft.nativeElement.style.left = 0 + '%';
    this.range.nativeElement.style.left = 0 + '%';

    this.inputRight.nativeElement.value = 100;
    this.thumbRight.nativeElement.style.right = 0 + '%';
    this.range.nativeElement.style.right = 0 + '%';
  }

  apply(): void {
    if (this.form.valid) {
      this.flightService.setFilterBy(this.form.value);
      this.changePage.emit();
    }
  }

  changePriceValue(value: string, percent: number): void {
    let val;
    const minP = 'minimumPrice';
    const maxP = 'maximumPrice';
    if (value === 'minimum') {
      val = percent === 0 ? 100 : 900 * (percent / 100) + 126;
      this.form.patchValue({ minimumPrice: val });
      if (this.form.controls[minP].value >= this.form.controls[maxP].value) {
        this.form.patchValue({
          minimumPrice: this.form.controls[maxP].value - 1,
        });
      }
    } else {
      val = percent === 100 ? 1000 : 900 * (percent / 100) + 74;
      this.form.patchValue({ maximumPrice: val });
      if (this.form.controls[minP].value >= this.form.controls[maxP].value) {
        this.form.patchValue({
          maximumPrice: this.form.controls[minP].value + 1,
        });
      }
    }
  }

  setLeftValue(): void {
    const currentInputRangeSelector = this.inputLeft.nativeElement;
    const min = Number(currentInputRangeSelector.min);
    const max = Number(currentInputRangeSelector.max);

    currentInputRangeSelector.value = Math.min(
      Number(currentInputRangeSelector.value),
      Number(this.inputRight.nativeElement.value) - 3
    );

    const percent =
      ((currentInputRangeSelector.value - min) / (max - min)) * 100;

    this.thumbLeft.nativeElement.style.left = percent + '%';
    this.range.nativeElement.style.left = percent + '%';
    this.changePriceValue('minimum', percent);
  }

  setRightValue(): void {
    const currentInputRangeSelector = this.inputRight.nativeElement;
    const min = Number(currentInputRangeSelector.min);
    const max = Number(currentInputRangeSelector.max);

    currentInputRangeSelector.value = Math.max(
      Number(currentInputRangeSelector.value),
      Number(this.inputLeft.nativeElement.value) + 3
    );

    const percent =
      ((currentInputRangeSelector.value - min) / (max - min)) * 100;

    this.thumbRight.nativeElement.style.right = 100 - percent + '%';
    this.range.nativeElement.style.right = 100 - percent + '%';

    this.changePriceValue('maximum', percent);
  }
}
