import { Component, Input, OnInit } from '@angular/core';
import { FlightDetail } from 'src/app/flight-result/interface/index.interface';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
})
export class FlightDetailsComponent implements OnInit {
  @Input() airline!: FlightDetail;

  constructor() {}

  ngOnInit(): void {}
}
