import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from './shared/services/i18n.service';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentTheme = '';
  constructor(
    private translate: TranslateService,
    private i18n: I18nService,
    private themeService: ThemeService
  ) {
    this.i18n.currentLanguage$.subscribe((res) => {
      translate.use(res);
    });

    this.themeService.themeSubject$.subscribe((res) => {
      this.currentTheme = res;
    });
  }
}
