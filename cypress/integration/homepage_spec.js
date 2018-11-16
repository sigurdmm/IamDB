/* eslint-disable no-undef */

const pageHost = process.env.CI_PAGE_HOST || 'http://127.0.0.1:3000';

describe('Search media', () => {
  let polyfill;

  /**
   * Load polyfill into testrunner
   * */
  before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';
    cy.request(polyfillUrl)
      .then((response) => {
        polyfill = response.body;
      });
  });

  beforeEach(() => {
    cy.visit(
      pageHost,
      {
        // Replaces fetch with a "stubbable" polyfill
        onBeforeLoad(win) {
          // eslint-disable-next-line no-param-reassign
          delete win.fetch;
          // since the application code does not ship with a polyfill
          // load a polyfilled "fetch" from the test
          win.eval(polyfill);
          // eslint-disable-next-line no-param-reassign
          win.fetch = win.unfetch;
        },
      },
    );
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

  it('Should redirect to media page when clicking on cover image', () => {
    cy.get('.searchbar')
      .find('input')
      .clear()
      .type('pirates of the caribbean{enter}');

    cy.get('.coverdisplay')
      .should('exist');

    cy.get('.cover a')
      .first()
      .click();
  });
});
