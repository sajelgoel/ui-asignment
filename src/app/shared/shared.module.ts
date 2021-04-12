import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TabFactoryComponent } from './components/tab-factory/tab-factory.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [TabFactoryComponent, HeaderComponent],
  exports: [TabFactoryComponent, HeaderComponent],
  imports: [CommonModule, HttpClientModule],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
