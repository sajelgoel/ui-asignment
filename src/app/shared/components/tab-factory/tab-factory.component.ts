import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-tab-factory',
  templateUrl: './tab-factory.component.html',
  styleUrls: ['./tab-factory.component.scss'],
})
export class TabFactoryComponent implements OnInit {
  @Input() tabs: Array<Tabs> = [];
  @Output() selectedTab = new EventEmitter();
  component: any;

  constructor() {}

  ngOnInit(): void {
    this.component = this.tabs[0].component;
  }

  tabselected(tab: Tabs): void {
    this.component = tab.component;
    this.selectedTab.emit(tab);
  }
}

export interface Tabs {
  label: string;
  selected: boolean;
  component: any;
  icon: string;
}
