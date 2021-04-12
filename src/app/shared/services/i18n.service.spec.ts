import { inject, TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';

describe('i18n service test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [I18nService],
    });
  });

  it('should return english language', inject(
    [I18nService],
    (service: I18nService) => {
      service.currentLanguage$.subscribe((val) => {
        expect(val).toBe('english');
      });
    }
  ));

  it('should return italian language', inject(
    [I18nService],
    (service: I18nService) => {
      service.changeLanguage('italian');

      service.currentLanguage$.subscribe((val) => {
        expect(val).toBe('italian');
      });
    }
  ));
});
