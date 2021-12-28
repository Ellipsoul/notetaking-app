import { Component, OnInit } from '@angular/core';

import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  theme:string;

  constructor(private themeService: ThemeService) {
    this.theme = this.applyTheme();
  }

  ngOnInit(): void {}

  // Theme management
  applyTheme() {
    return this.themeService.getTheme();
  }

  toggleTheme():void {
    this.themeService.toggleTheme();
    this.theme = this.applyTheme();
  }
}
