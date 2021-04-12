import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlightService } from '../../../services/flight.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent implements OnInit {
  @Output() changePage = new EventEmitter();
  constructor(private flightService: FlightService) {}
  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      sortBy: new FormControl('', Validators.required),
    });
    this.flightService.sortBy$.subscribe((val: any) => {
      if (val && val.sortBy) {
        this.form.setValue({ sortBy: val.sortBy });
      }
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.flightService.setSortBy(this.form.value);
      this.changePage.emit();
    }
  }
}
