import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './ScrollPage.stories';

const { Default } = composeStories(stories);

describe('ScrollPage component', () => {
   it('should render - to bottom', () => {
      mount(<Default to='bottom' />);
      cy.scrollTo('0%', '9000px');
      cy.get('[data-testid=ScrollPage]').click();
      cy.wait(500);
      cy.window().then(($window) => {
         expect($window.scrollY).to.be.greaterThan(9000);
      })
   });
   it('should render - to top', () => {
      mount(<Default to='top' />);
      cy.scrollTo('0%', '500px');
      cy.get('[data-testid=ScrollPage]').click();
      cy.wait(500);
      cy.window().then(($window) => {
         expect($window.scrollY).to.be.equal(0);
      });
   });
});