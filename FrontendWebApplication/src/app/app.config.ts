import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Import your routes configuration
import { AppComponent } from './app.component'; // Import your AppComponent
import { HomeComponent } from './features/home/components/home.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Enable zone change detection
    provideRouter(routes), // Provide routing configuration
    HomeComponent, // Register the DashboardComponent
    AppComponent // Register the AppComponent (not strictly necessary for standalone bootstrapping)
  ]
};
