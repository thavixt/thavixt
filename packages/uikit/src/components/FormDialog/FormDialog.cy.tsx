import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './FormDialog.stories';

const { Default } = composeStories(stories);

describe('FormDialog component', () => {
   it('should render', () => {
      const onSubmit = cy.spy().as('onSubmit');
      
      mount(<Default defaultOpen onSubmit={onSubmit}/>);

      cy.get('button[type=submit').click();
      cy.get('input[name=name').type('Jane Doe');
      cy.get('@onSubmit').should('not.be.called');

      cy.get('input[name=job]').type('HR assistant');
      cy.get('button[type=submit').click();
      cy.get('@onSubmit').should('be.calledOnce');
   });
});