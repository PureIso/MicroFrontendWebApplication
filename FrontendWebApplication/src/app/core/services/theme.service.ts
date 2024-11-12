// ./src/app/theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private currentTheme: string = 'dark'; // Default theme

  constructor() {
    // Load the saved theme on application start
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme(this.currentTheme); // Set default theme
    }
  }

  setTheme(theme: string) {
    this.currentTheme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(this.THEME_KEY, theme); // Save the theme to local storage
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  getTheme() {
    return this.currentTheme;
  }
}
