import { inject, TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  // it('should return english language', inject(
  //   [ThemeService],
  //   (service: ThemeService) => {
  //     service.themeSubject$.subscribe((val) => {
  //       expect(val).toBe('light');
  //     });
  //   }
  // ));

  it('theme is set to light', () => {
    service.themeSubject$.subscribe((val) => {
      expect(val).toBe('light');
    });
  });

  it('theme is set to dark', () => {
    service.changeTheme('dark');
    service.themeSubject$.subscribe((val) => {
      expect(val).toBe('dark');
    });
  });
});
