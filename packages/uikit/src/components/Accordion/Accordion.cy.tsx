import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Accordion.stories';

const { Default } = composeStories(stories);

describe('Accordion component', () => {
    it('should render', () => {
        mount(<Default />);
        cy.get('[data-testid="accordion-body"]').should('not.be.visible');

        cy.get('[data-testid="accordion-title"]').should('be.visible');
        cy.get('[data-testid="accordion-opentitle"]').should('not.be.visible');

        cy.get('[data-testid="accordion-title"]').click();

        cy.get('[data-testid="accordion-title"]').should('not.be.visible');
        cy.get('[data-testid="accordion-opentitle"]').should('be.visible');

        cy.get('[data-testid="accordion-body"]').should('be.visible');
    });
});