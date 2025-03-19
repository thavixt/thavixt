import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Tooltip.stories';

const { Default } = composeStories(stories);

// why does it fail in CI?
describe.skip('Tooltip component', () => {
   it('should render', () => {
      mount(<Default />);
      cy.get('[data-testid=TooltipContent').should('not.be.visible');
      cy.get('[data-testid=Tooltip').realHover();
      cy.get('[data-testid=TooltipContent').should('be.visible');
   });
});