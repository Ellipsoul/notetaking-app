import { Injectable } from '@angular/core';

// Service provides theming functionality
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {
  }

  // Managing theme in local storage
  private setTheme(theme: string): void {
    localStorage.setItem('theme', theme);
  }

  // Retrieve theme, or default to light
  getTheme(): string {
    const theme = localStorage.getItem('theme');
    if (theme === null) {
      this.setTheme('dark');
      return 'dark';
    } else {
      return theme;
    }
  }

  toggleTheme(): void {
    const theme = this.getTheme();
    if (theme === 'light') {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }
}
