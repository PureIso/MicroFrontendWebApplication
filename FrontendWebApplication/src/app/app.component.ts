import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule], // Add CommonModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FrontendWebApplication';
  isRemoteAvailable = true; // Tracks whether the remote component is available
  isDarkMode: boolean = false; // Tracks whether the current theme is dark mode
  private themeSubscription!: Subscription; // Non-null assertion

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Subscribe to the theme observable to get theme updates
    this.themeSubscription = this.themeService.theme$.subscribe((theme) => {
      this.isDarkMode = theme === 'dark'; // Update the isDarkMode flag based on the current theme
    });

    // Check if the remote `app-dashboard` component is registered
    if (!customElements.get('app-dashboard')) {
      this.isRemoteAvailable = false;
    }
  }

  // Function to toggle between light and dark themes
  toggleTheme(): void {
    this.themeService.toggleTheme(); // Toggle theme using the ThemeService
  }

  // Function to toggle the visibility of the mobile menu
  toggleMobileMenu(): void {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
      menu.classList.toggle('hidden'); // Toggle the 'hidden' class to show/hide the menu
    }
  }

  ngOnDestroy(): void {
    // Clean up the subscription when the component is destroyed
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
