import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Accordion.stories';

const { Default } = composeStories(stories);

describe('Accordion component', () => {
    it('should render', () => {
        mount(<Default />);
        cy.get('[data-testid="AccordionBody"]').should('not.be.visible');

        cy.get('[data-testid="AccordionTitle"]').should('be.visible');
        cy.get('[data-testid="AccordionOpenTitle"]').should('not.exist');
        cy.get('[data-testid="AccordionTitle"]').click();
        cy.get('[data-testid="AccordionTitle"]').should('not.exist');
        cy.get('[data-testid="AccordionOpenTitle"]').should('be.visible');

        cy.get('[data-testid="AccordionOpenTitle"]').click();
        cy.get('[data-testid="AccordionTitle"]').should('be.visible');
        cy.get('[data-testid="AccordionOpenTitle"]').should('not.exist');

        cy.get('[data-testid="AccordionTitle"]').click();
        cy.get('[data-testid="AccordionTitle"]').should('not.exist');
        cy.get('[data-testid="AccordionOpenTitle"]').should('be.visible');
    });
});