// ./src/app/theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private currentTheme: string = 'dark'; // Default theme
  private themeSubject: BehaviorSubject<string> = new BehaviorSubject(this.currentTheme);

  constructor() {
    // Load the saved theme on application start
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme(this.currentTheme); // Set default theme
    }
  }

  // Emits the current theme to subscribers
  get theme$() {
    return this.themeSubject.asObservable();
  }

  // Set the theme and update the document class
  setTheme(theme: string) {
    this.currentTheme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(this.THEME_KEY, theme); // Save the theme to local storage
    this.themeSubject.next(theme); // Notify subscribers of theme change
  }

  // Toggle between light and dark themes
  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  // Get the current theme
  getTheme() {
    return this.currentTheme;
  }
}