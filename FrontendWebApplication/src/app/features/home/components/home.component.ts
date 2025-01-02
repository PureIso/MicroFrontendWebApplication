import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core'; // Import TranslateModule

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true, // Mark as a standalone component
  imports: [TranslateModule] // Add TranslateModule here
})
export class HomeComponent {
  constructor(private translate: TranslateService) {
    // Set default language
    this.translate.setDefaultLang('en');
    this.translate.use('en'); // You can set this dynamically based on the user's choice
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
  }
}
