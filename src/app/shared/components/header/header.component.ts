import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  languages: Array<string> = ['english', 'italian'];
  themes: Array<string> = ['light', 'dark'];

  constructor(private i18n: I18nService, private themeService: ThemeService) {}

  ngOnInit(): void {}

  languageChange(value: string): void {
    this.i18n.changeLanguage(value);
  }

  themeChange(value: string): void {
    this.themeService.changeTheme(value);
  }
}
