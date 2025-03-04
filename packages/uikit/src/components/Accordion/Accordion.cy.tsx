import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Accordion.stories';

const { Default } = composeStories(stories);

describe('Accordion component', () => {
    it('should render', () => {
        mount(<Default />);

        cy.get('[data-testid="content"]').should('not.be.visible');

        cy.get('[data-testid="title"]').should('be.visible');
        cy.get('[data-testid="title-open"]').should('not.be.visible');

        cy.get('[data-testid="title"]').click();

        cy.get('[data-testid="title"]').should('not.be.visible');
        cy.get('[data-testid="title-open"]').should('be.visible');

        cy.get('[data-testid="content"]').should('be.visible');
    });
});