import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Toast.stories';

const { Default } = composeStories(stories);

describe('Toast component', () => {
   it('should render', () => {
      mount(<Default />);

      cy.get('[data-testid=Toast').should('not.be.visible');
      cy.get('[data-testid=show]').click();
      cy.get('[data-testid=Toast').should('be.visible');
      cy.get('[data-testid=hide]').click();
      cy.get('[data-testid=Toast').should('not.be.visible');
      cy.get('[data-testid=show]').click();
      cy.get('[data-testid=Toast').should('be.visible');
      cy.get('[data-testid=close]').click();
      cy.get('[data-testid=Toast').should('not.be.visible');
   });
});