import { Component } from '@angular/core';

import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'Notetaking App';
  public theme: string;

  themeEventHandler($event: any) {
    this.theme = $event;
  }

  constructor(private themeService: ThemeService) {
    this.theme = this.themeService.getTheme();
  }
}
