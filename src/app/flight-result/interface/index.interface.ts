export interface FlightDetail {
  logo: string;
  name: string;
  fromTime: string;
  fromPlace: string;
  toPlace: string;
  toTime: string;
  classes: Classes[];
  stop: number;
  totalTime: string;
}

export interface Classes {
  category: string;
  price: number;
  seatLeft: number;
}

export interface Response {
  from: string;
  to: string;
  fromDate: string;
  toDate: string;
  traveler: string;
  flightResult: FlightDetail[];
}

export interface FlightResponse {
  payload: Response;
}
