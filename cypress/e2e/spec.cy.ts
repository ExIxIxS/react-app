/// <reference types="cypress" />

describe('Just visit e2e test', () => {
  it('should visit', () => {
    cy.visit('/');
  });

  it('correct search input', () => {
    cy.visit('/');
  });
});
