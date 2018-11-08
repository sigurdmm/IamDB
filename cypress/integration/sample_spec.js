/* eslint-disable no-undef */

const pageHost = process.env.CI_PAGE_HOST || 'http://127.0.0.1:3000';

describe('Search media', () => {
  beforeEach(() => {
    cy.visit(pageHost);
  });

  it('Should display search bar', () => {
    cy.get('.searchbar').find('input').should('have.attr', 'type', 'field');
  });

  it('Should accept search phrases', () => {
    const searchPhrase = 'The Dark Knight';
    const searchPhrase2 = 'Harry potter';

    cy
      .get('.searchbar')
      .find('input')
      .type(searchPhrase)
      .should('have.value', searchPhrase)
      // Test that we can change our mind
      .clear()
      .type(searchPhrase2)
      .should('have.value', searchPhrase2);
  });

  it('Should search on submit', () => {
    cy
      .get('.searchbar')
      .find('input')
      .type('The Dark knight');

    cy.get('.searchbar').submit();
  });
});
