describe('AppComponent', () => {
    beforeEach(() => {
      // Visit the application root
      cy.visit('/');
    });
  
    it('should render the app paragraph', () => {
      // Verify the paragraph text is as expected
      cy.get('[data-cy="app-paragraph"]').should(
        'contain.text',
        'Remote Frontend Application Loaded - App Component'
      );
    });
  });
  