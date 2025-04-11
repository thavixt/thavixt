import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Form.stories';

const { Default } = composeStories(stories);

describe('Form component', () => {
   it('should render', () => {
      const onSubmit = cy.spy().as('onSubmit');

      mount(<Default onSubmit={onSubmit} />);

      cy.get('input[name=name').clear();
      cy.get('button[type=submit').click();
      cy.get('@onSubmit').should('not.be.called');

      cy.get('input[name=name').type('My name goes here');
      cy.get('button[type=submit').click();
      cy.get('@onSubmit').should('be.calledOnce');
   });
});