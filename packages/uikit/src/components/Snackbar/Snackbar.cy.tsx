import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Snackbar.stories';

const { Default } = composeStories(stories);

describe('Snackbar component', () => {
   it('should render', () => {
      mount(<Default />);

      cy.get('[data-testid=Snackbar').should('not.be.visible');
      cy.get('[data-testid=show]').click();
      cy.get('[data-testid=Snackbar').should('be.visible');
      cy.get('[data-testid=hide]').click();
      cy.get('[data-testid=Snackbar').should('not.be.visible');
      cy.get('[data-testid=show]').click();
      cy.get('[data-testid=Snackbar').should('be.visible');
      cy.get('[data-testid=close]').click();
      cy.get('[data-testid=Snackbar').should('not.be.visible');
   });
});