import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Drawer.stories';

const { Default } = composeStories(stories);

describe('Drawer component', () => {
    it('should render - bottom', () => {
        mount(<Default side="bottom" />);

        cy.get('[data-testid="drawer"]').should('not.be.visible');

        cy.get('[data-testid="toggleDrawer"]').click();
        cy.get('[data-testid="drawer"]').should('be.visible');

        cy.get('[data-testid="toggleDrawerInside"]').click();
        cy.get('[data-testid="drawer"]').should('not.be.visible');

        cy.get('[data-testid="toggleDrawer"]').click();
    });
    it('should render - right', () => {
        mount(<Default side="right" />);

        cy.get('[data-testid="drawer"]').should('not.be.visible');

        cy.get('[data-testid="toggleDrawer"]').click();
        cy.get('[data-testid="drawer"]').should('be.visible');

        cy.get('[data-testid="toggleDrawerInside"]').click();
        cy.get('[data-testid="drawer"]').should('not.be.visible');

        cy.get('[data-testid="toggleDrawer"]').click();
    });
});