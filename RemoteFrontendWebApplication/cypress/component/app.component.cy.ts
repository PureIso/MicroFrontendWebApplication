import { AppComponent } from '../../src/app/app.component';
import { mount } from 'cypress/angular';

describe('AppComponent', () => {
  it('should render the app paragraph with correct text', () => {
    mount(AppComponent);

    // Verify the content of the paragraph
    cy.get('p').should(
      'contain.text',
      'Remote Frontend Application Loaded - App Component'
    );
  });
});
