import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Toast.stories';

const { Default } = composeStories(stories);

describe('Toast component', () => {
   beforeEach(() => {
      cy.viewport(400, 800);
   })
   it('should fade out after timer ends', () => {
      const onToastCreatedSpy = cy.spy().as('onToastCreated');
      // @ts-expect-error mehhhh
      mount(<Default onToastCreated={onToastCreatedSpy} duration={1000} />);

      cy.get('button[type=submit]')
         .click();
      cy.wait(1100);
      cy.get(`[data-testid~="infoToast"]`)
         .should('not.exist');
      cy.get(`[data-testid~="Toast"]`)
         .should('have.length', 0);
      cy.get('@onToastCreated')
         .its('callCount')
         .should('eq', 1);
   });

   it('should render variants', () => {
      const onToastCreatedSpy = cy.spy().as('onToastCreated');
      // @ts-expect-error mehhhh
      mount(<Default onToastCreated={onToastCreatedSpy} />);

      cy.get('button[type=submit]')
         .click();
      cy.wait(250);
      cy.get(`[data-testid~="infoToast"]`)
         .should('be.visible');
      cy.get(`[data-testid~="Toast"]`)
         .should('have.length', 1);
      cy.get('@onToastCreated')
         .its('callCount')
         .should('eq', 1);

      cy.get('input[value=success]')
         .click();
      cy.get('button[type=submit]')
         .click();
      cy.wait(250);
      cy.get(`[data-testid~="successToast"]`)
         .should('be.visible');
      cy.get(`[data-testid~="Toast"]`)
         .should('have.length', 2);
      cy.get('@onToastCreated')
         .its('callCount')
         .should('eq', 2);

      cy.get('input[value=warning]')
         .click();
      cy.get('button[type=submit]')
         .click();
      cy.wait(250);
      cy.get(`[data-testid~="warningToast"]`)
         .should('be.visible');
      cy.get(`[data-testid~="Toast"]`)
         .should('have.length', 3);
      cy.get('@onToastCreated')
         .its('callCount')
         .should('eq', 3);

      cy.get('button[type=reset]')
         .click();
      cy.get(`[data-testid~="Toast"]`)
         .should('not.exist');
   });

   it('should render correct content', () => {
      const onToastCreatedSpy = cy.spy().as('onToastCreated');
      // @ts-expect-error mehhhh
      mount(<Default onToastCreated={onToastCreatedSpy} />);

      cy.get('textarea[name="toastMessage"]')
         .clear()
         .type('Hello world!');
      cy.get('button[type=submit]')
         .click();
      cy.wait(250);
      cy.get(`[data-testid~="infoToast"]`)
         .should('be.visible');
      cy.get(`[data-testid~="infoToast"]`)
         .should('have.text', 'Hello world!');
      cy.get(`[data-testid~="Toast"]`)
         .should('have.length', 1);
      cy.get('@onToastCreated')
         .its('callCount')
         .should('eq', 1);
   });
});