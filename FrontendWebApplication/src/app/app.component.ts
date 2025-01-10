import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { TranslateService, TranslateModule } from '@ngx-translate/core'; // Import TranslateService and TranslateModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TranslateModule], // Add TranslateModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FrontendWebApplication';
  isRemoteAvailable = true; // Tracks whether the remote component is available
  isDarkMode: boolean = false; // Tracks whether the current theme is dark mode
  private destroy$ = new Subject<void>(); // Subject to manage component destruction

  constructor(
    private themeService: ThemeService,
    private translateService: TranslateService // Inject TranslateService
  ) {}

  ngOnInit(): void {
    // Subscribe to the theme observable to get theme updates
    this.themeService.theme$
      .pipe(takeUntil(this.destroy$)) // Automatically unsubscribe on component destroy
      .subscribe((theme) => {
        this.isDarkMode = theme === 'dark'; // Update the isDarkMode flag based on the current theme
      });

    // Check if the remote `app-dashboard` component is registered
    if (!customElements.get('app-dashboard')) {
      this.isRemoteAvailable = false;
    }

    // Set default language dynamically
    const defaultLang = 'en'; // Default language can be dynamically loaded or configured
    this.translateService.setDefaultLang(defaultLang);
    this.translateService.use(defaultLang); // Set the initial language

    // Set the initial title
    this.translateService
      .get('TITLE')
      .pipe(takeUntil(this.destroy$))
      .subscribe((translatedTitle) => {
        this.title = translatedTitle;
      });

    // Update the title dynamically when the language changes
    this.translateService.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.translateService.get('TITLE').subscribe((translatedTitle) => {
          this.title = translatedTitle;
        });
      });
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    this.themeService.toggleTheme(); // Toggle theme using the ThemeService
  }

  /**
   * Toggle the visibility of the mobile menu
   */
  toggleMobileMenu(): void {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
      menu.classList.toggle('hidden'); // Toggle the 'hidden' class to show/hide the menu
    }
  }

  /**
   * Change the language based on user selection
   * @param event - The change event from the language select input
   */
  changeLanguage(event: Event): void {
    const selectedLang = (event.target as HTMLSelectElement).value;
    this.translateService.use(selectedLang); // Change the language dynamically
  }

  ngOnDestroy(): void {
    // Clean up the subscription when the component is destroyed
    this.destroy$.next();
    this.destroy$.complete();
  }
}
