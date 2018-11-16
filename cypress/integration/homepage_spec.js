/* eslint-disable no-undef */

const pageHost = process.env.CI_PAGE_HOST || 'http://127.0.0.1:3000';

describe('Search media', () => {
  beforeEach(() => {
    cy.visit(pageHost);
  });

  it('Should render an .alertbar__error on bullshit input', () => {
    cy.get('.searchbar').find('input').type('djdjjdjdjjdjd {enter}');
    cy.get('.alertbar__error').should('exist');
  });

  it('Should not render alertbar and should render a cover display on batman', () => {
    cy.get('.searchbar').find('input').type('batman{enter}');
    cy.wait(2);
    cy.get('.alertbar__error').should('not.exist');
    cy.get('.coverdisplay > .cover').should('exist');
  });

  it('Should render coverdisplay even after an error search earlier', () => {
    cy.get('.searchbar').find('input').type('dasjflksadfjdguih{enter}');
    cy.wait(2000);
    cy.get('.alertbar__error').should('exist');
    cy.get('.coverdisplay').should('not.exist');
    cy.get('.searchbar').find('input').clear().type('tarzan{enter}');
    cy.wait(2000);
    cy.get('.coverdisplay').should('exist');
    cy.get('.alertbar__error').should('not.exist');

    cy.get('.pagination').find('a').contains(2).click();
    cy.wait(2000);
    cy.get('.coverdisplay > .cover').should('exist');
  });

  it('Should render a page where there exists a cover when paginating to page 2', () => {
    cy.get('.searchbar').find('input').clear().type('homeland{enter}');
    cy.wait(2000);
    cy.get('.coverdisplay').should('exist');
    cy.get('.alertbar__error').should('not.exist');

    cy.get('.pagination').find('a').contains(2).click();
    cy.wait(2000);
    cy.get('.coverdisplay > .cover').should('exist');
  });
});
