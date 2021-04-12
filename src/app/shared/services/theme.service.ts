import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject('light');
  themeSubject$ = this.themeSubject.asObservable();

  constructor() {}

  changeTheme(value: string): void {
    this.themeSubject.next(value);
  }
}
