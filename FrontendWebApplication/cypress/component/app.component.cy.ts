import { AppComponent } from '../../src/app/app.component';
import { mount } from 'cypress/angular';

describe('AppComponent', () => {
  beforeEach(() => {
    // Mount the component before each test
    mount(AppComponent);
  });

  it('should render the header with correct links and actions', () => {
    // Assert that the header contains the app name
    cy.get('header').contains('Your App Name').should('be.visible');

    // Assert that the navigation links are present
    const links = ['Components', 'Templates', 'Docs', 'Blog'];
    links.forEach((link) => {
      cy.get('nav').contains(link).should('be.visible');
    });

    // Assert that the "Get Started" button exists and is clickable
    cy.get('a').contains('Get Started').should('be.visible').and('not.be.disabled');
  });

  it('should toggle the mobile menu visibility when clicked', () => {
    // Assert that the mobile menu is hidden by default
    cy.get('#mobile-menu').should('have.class', 'hidden');

    // Click the mobile menu toggle button
    cy.get('#mobile-menu-button').click();

    // Assert that the mobile menu becomes visible
    cy.get('#mobile-menu').should('not.have.class', 'hidden');

    // Click the mobile menu toggle button again
    cy.get('#mobile-menu-button').click();

    // Assert that the mobile menu is hidden again
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
    // Assert that the footer contains the copyright text
    cy.get('footer').contains('© 2024 Your Company. All rights reserved.').should('be.visible');
  });
});
