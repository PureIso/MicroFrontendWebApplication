import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private currentTheme: string = 'dark'; // Default theme
  private themeSubject: BehaviorSubject<string> = new BehaviorSubject(this.currentTheme);
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);

    // Load the saved theme on application start
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme(this.currentTheme); // Set default theme
    }
  }

  /**
   * Observable for the current theme
   * @returns Observable emitting the current theme
   */
  get theme$() {
    return this.themeSubject.asObservable();
  }

  /**
   * Sets the theme and updates the document class
   * @param theme - The theme to set ('light' or 'dark')
   */
  setTheme(theme: string): void {
    this.currentTheme = theme;

    // Update the document's root class
    if (theme === 'dark') {
      this.renderer.addClass(document.documentElement, 'dark');
    } else {
      this.renderer.removeClass(document.documentElement, 'dark');
    }

    // Save the theme to local storage
    localStorage.setItem(this.THEME_KEY, theme);

    // Notify subscribers of the theme change
    this.themeSubject.next(theme);
  }

  /**
   * Toggles between light and dark themes
   */
  toggleTheme(): void {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  /**
   * Retrieves the current theme
   * @returns The current theme ('light' or 'dark')
   */
  getTheme(): string {
    return this.currentTheme;
  }
}