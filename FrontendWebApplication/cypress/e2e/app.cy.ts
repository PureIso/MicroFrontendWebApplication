describe('AppComponent E2E', () => {
    beforeEach(() => {
      // Navigate to the root of the app
      cy.visit('/');
    });
  
    it('should render the header and navigate links correctly', () => {
      // Verify the app name in the header
      cy.get('header').contains('Your App Name').should('be.visible');
  
      // Verify navigation links are visible and have correct labels
      const links = ['Components', 'Templates', 'Docs', 'Blog'];
      links.forEach((link) => {
        cy.get('nav').contains(link).should('be.visible');
      });
  
      // Assert the "Get Started" button exists and is clickable
      cy.get('a').contains('Get Started').should('be.visible').and('not.be.disabled');
  
      // Simulate a click on the "Get Started" button (adjust URL as per your app's routing)
      cy.get('a').contains('Get Started').click();
      cy.url().should('include', '/'); // Replace with actual target path if necessary
    });
  
    it('should toggle the mobile menu visibility when the button is clicked', () => {
      // Assert the mobile menu is hidden by default
      cy.get('#mobile-menu').should('have.class', 'hidden');
  
      // Click the mobile menu toggle button
      cy.get('#mobile-menu-button').click();
  
      // Assert the mobile menu becomes visible
      cy.get('#mobile-menu').should('not.have.class', 'hidden');
  
      // Click the mobile menu toggle button again
      cy.get('#mobile-menu-button').click();
  
      // Assert the mobile menu is hidden again
      cy.get('#mobile-menu').should('have.class', 'hidden');
    });
  
    it('should toggle the theme when the toggle button is clicked', () => {
      // Check initial theme class (e.g., dark mode might be default)
      cy.get('body').should('not.have.class', 'dark');
  
      // Click the theme toggle button
      cy.get('button').contains('svg').click();
  
      // Assert that the theme class changes (e.g., dark mode enabled)
      cy.get('body').should('have.class', 'dark');
  
      // Click the button again to toggle back
      cy.get('button').contains('svg').click();
  
      // Assert that the theme class reverts
      cy.get('body').should('not.have.class', 'dark');
    });
  
    it('should render the footer with correct text', () => {
      // Assert the footer contains the copyright text
      cy.get('footer').contains('© 2024 Your Company. All rights reserved.').should('be.visible');
    });
  });
  