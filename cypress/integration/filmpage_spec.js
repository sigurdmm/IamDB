/* eslint-disable no-undef */

const id = '5beea18db3ff29001f070463';
const pageHost = process.env.CI_PAGE_HOST || 'http://127.0.0.1:3000';

describe('Fetch some media', () => {
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
      `${pageHost}/media/${id}`,
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
  it('should render coverdisplay', () => {
    cy.get('.coverdisplay')
      .should('exist');
  });
  it('should submit comment in comment list', () => {
    const randComment = `This is a comment ${(Math.random() * 86) * Math.random()}`;

    cy.get('.commentform').find('textarea').type(randComment);
    cy.get('.commentform').find('button').click();
    cy.wait(2000);

    cy.get('.comment__published')
      .should('exist');
  });
  it('Should redirect to actor page when clicking on cover image', () => {
    cy.get('.coverdisplay')
      .should('exist');
    cy.get('.cover a')
      .first()
      .click();
  });
});
