import {composeStories} from '@storybook/react';
import {mount} from '@cypress/react';
import * as stories from './ClickTarget.stories';

const { Default } = composeStories(stories);

describe('ClickTarget component', () => {
   it('should render', () => {
       mount(<Default />);
       
       cy.get('[data-testid="regular-button"]').click();
       cy.get('[data-testid="lastClick"]').should('contain.text', 'outside');
       cy.get('[data-testid="button"]').click();
       cy.get('[data-testid="lastClick"]').should('contain.text', 'inside');
   });
});