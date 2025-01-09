import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ThemeService } from './core/services/theme.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import '@types/jest';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let themeService: ThemeService;
  let translateService: TranslateService;

  // Mock localStorage
  const mockLocalStorage = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => (store[key] = value),
      clear: () => (store = {}),
      removeItem: (key: string) => delete store[key],
    };
  })();

  beforeEach(async () => {
    // Replace global localStorage with our mock
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    // Configure the testing module
    await TestBed.configureTestingModule({
      imports: [AppComponent, CommonModule, TranslateModule.forRoot()],
      providers: [ThemeService, TranslateService],
    }).compileComponents();

    // Create the component and services
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should update theme to "dark" when themeService emits "dark"', () => {
    themeService.setTheme('dark'); // Use the real service to set the theme
    fixture.detectChanges();
    expect(component.isDarkMode).toBeTruthy(); // Ensure the component reflects the change
  });

  it('should toggle the theme when toggleTheme is called', (done) => {
    // Initially, theme should be dark
    expect(component.isDarkMode).toBeTruthy();
  
    // Toggle the theme
    component.toggleTheme();
  
    // Wait for the observable to emit the updated value
    themeService.theme$.subscribe(() => {
      fixture.detectChanges(); // Trigger change detection after theme update
      expect(component.isDarkMode).toBeFalsy(); // Should now be light mode
  
      // Toggle again
      component.toggleTheme();
      themeService.theme$.subscribe(() => {
        fixture.detectChanges();
        expect(component.isDarkMode).toBeTruthy(); // Should now be dark mode again
        done(); // Indicate the test is done
      });
    });
  });

  it('should set default language to "en"', () => {
    const defaultLang = 'en';
    expect(translateService.currentLang).toEqual(defaultLang);
  });

  it('should change language dynamically when changeLanguage is called', () => {
    const event = { target: { value: 'es' } };
    component.changeLanguage(event as unknown as Event);
    expect(translateService.currentLang).toEqual('es');
  });
});
