// ./app/app.component.ts
import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { DashboardComponent } from './features/dashboard/components/dashboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
})
export class AppComponent {
  title = 'RemoteFrontendWebApplication';

  constructor(private themeService: ThemeService) {
    // Set initial theme
    this.themeService.setTheme(this.themeService.getTheme());
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
