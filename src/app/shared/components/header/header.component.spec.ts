import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let i18nService;
  let themeService;

  beforeEach(async () => {
    i18nService = jasmine.createSpyObj(['changeLanguage']);
    themeService = jasmine.createSpyObj(['changeTheme']);

    component = new HeaderComponent(i18nService, themeService);
  });

  it('should call themechange method', () => {
    spyOn(component, 'themeChange');
    component.themeChange('dark');
    expect(component.themeChange).toHaveBeenCalled();
  });

  it('should call languageChange method', () => {
    spyOn(component, 'languageChange');
    component.languageChange('italian');
    expect(component.languageChange).toHaveBeenCalled();
  });
});
