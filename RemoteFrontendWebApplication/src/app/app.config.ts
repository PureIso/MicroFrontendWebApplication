import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Import your routes configuration
import { DashboardComponent } from './features/dashboard/components/dashboard.component'; // Adjust path to your DashboardComponent
import { AppComponent } from './app.component'; // Import your AppComponent

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Enable zone change detection
    provideRouter(routes), // Provide routing configuration
    DashboardComponent, // Register the DashboardComponent
    AppComponent // Register the AppComponent (not strictly necessary for standalone bootstrapping)
  ]
};
