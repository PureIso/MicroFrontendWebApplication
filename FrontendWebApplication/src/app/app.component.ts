// ./app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Your Angular App';
  isRemoteAvailable = true;

  constructor(private themeService: ThemeService) {
    // Set initial theme
    this.themeService.setTheme(this.themeService.getTheme());
  }

  ngOnInit() {
    // Check if the remote `app-dashboard` component is registered
    if (!customElements.get('app-dashboard')) {
      this.isRemoteAvailable = false;
    }
  }

  // Function to toggle between light and dark themes
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  // Function to toggle the visibility of the mobile menu
  toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
      menu.classList.toggle('hidden'); // Toggle the 'hidden' class to show/hide the menu
    }
  }
}
