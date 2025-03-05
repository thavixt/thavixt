import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Tree.stories';

const { Default } = composeStories(stories);

describe('Tree component', () => {
   it('should render', () => {
      mount(<Default />);

      cy.contains('Second nested').should('not.be.visible');
      cy.contains('Second item').should('exist');
      cy.contains('Second item').click();
      
      cy.contains('Second deeply nested').should('not.be.visible');
      cy.contains('Second nested').should('be.visible');
      cy.contains('Second nested').click();
      cy.contains('Second deeply nested').should('be.visible');

      cy.contains('Second nested').click();
      cy.contains('Second deeply nested').should('not.be.visible');
      
      cy.contains('Second item').click();
      cy.contains('Second nested').should('not.be.visible');
      
      cy.contains('Second item').click();
      cy.contains('Second nested').should('be.visible');
      cy.contains('Second deeply nested').should('not.be.visible');
   });
});