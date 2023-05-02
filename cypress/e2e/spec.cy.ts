/// <reference types="cypress" />

describe('e2e application test', () => {
  it('should visit', () => {
    cy.visit('/');
  });

  it('open form page by click on a nav item', () => {
    cy.visit('/');
    cy.get('a[href]').filter('[href="/form"]').click();
    cy.url().should('include', '/form');
  });

  it('open main page from form page by click on a nav item', () => {
    cy.visit('/');
    cy.get('a[href]').filter('[href="/"]').click();
    cy.get('.search-panel').should('have.length', 1);
  });

  it('open about us page by click on a nav item', () => {
    cy.visit('/');
    cy.get('a[href]').filter('[href="/about"]').click();
    cy.url().should('include', '/about');
  });

  it('open 404 page by providing invalid path', () => {
    cy.visit('/fdfdfdfdfdfdfdf');
    cy.get('h1').contains('PAGE NOT FOUND!!!');
  });

  it('correct search response when result found', () => {
    cy.visit('/');
    cy.get('.search-panel__input').type('Artur{enter}');
    cy.get('.rest-card').should('have.length', 12);
  });

  it('correct search response when result not found', () => {
    cy.visit('/');
    cy.get('.search-panel__input').type('dfdfdfdfdfxccxcxcxzsdff{enter}');
    cy.get('.rest-card').should('have.length', 0);
    cy.get('.notification-bar').contains('Nothing found');
  });

  it('open modal by click on a card', () => {
    cy.visit('/');
    cy.get('.rest-card').first().click();
    cy.get('.rest-author-card').should('have.length', 1);
  });

  it('fill the form with errors', () => {
    cy.visit('/form');
    cy.get('#name-input').type('Artur{enter}');
    cy.get('.form__error').should('have.length', 6);
  });

  it('fill the form correct without errors', () => {
    const testFile = new File(['testFile'], 'test.png', { type: 'image/png' });

    cy.visit('/form');
    cy.get('#name-input').type('Artur');
    cy.get('#surname-input').type('Clark');
    cy.get('#dob-input').type('1978-05-10');
    cy.get('#country-select').select('canada');
    cy.get('input[type="radio"][value="male"]').check();
    cy.get('#notifications-checkbox').check();
    cy.get('input[type=file]').then((subject) => {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(testFile);
      const fileInput = subject[0] as HTMLInputElement;
      fileInput.files = dataTransfer.files;
      fileInput.dispatchEvent(new Event('change', { bubbles: true }));
    });

    cy.get('#submit-button').click();

    cy.get('.form__error').should('have.length', 0);
  });

  it('fill the form correct with adding new card', () => {
    const testFile = new File(['testFile'], 'test.png', { type: 'image/png' });

    cy.visit('/form');
    cy.get('#name-input').type('Artur');
    cy.get('#surname-input').type('Clark');
    cy.get('#dob-input').type('1978-05-10');
    cy.get('#country-select').select('canada');
    cy.get('input[type="radio"][value="male"]').check();
    cy.get('#notifications-checkbox').check();
    cy.get('input[type=file]').then((subject) => {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(testFile);
      const fileInput = subject[0] as HTMLInputElement;
      fileInput.files = dataTransfer.files;
      fileInput.dispatchEvent(new Event('change', { bubbles: true }));
    });

    cy.get('#submit-button').click();

    cy.get('.card').should('have.length', 1);
  });
});
