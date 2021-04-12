import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private currentLanguage = new BehaviorSubject('english');
  currentLanguage$ = this.currentLanguage.asObservable();

  constructor() {}

  changeLanguage(value: string): void {
    this.currentLanguage.next(value);
  }
}
