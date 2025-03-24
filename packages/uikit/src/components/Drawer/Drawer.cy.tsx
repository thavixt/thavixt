import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Drawer.stories';

const { Default } = composeStories(stories);

describe('Drawer component', () => {
    it('should render - left', () => {
        mount(<Default side="left" />);
        cy.get('[data-testid="ToggleDrawer"]').click();
        cy.wait(500);
        cy.get('[data-testid="Drawer"]').should('be.visible');
        cy.get('[data-testid="ToggleDrawerInside"]').click();
        cy.wait(500);
        cy.get('[data-testid="Drawer"]').should('not.be.visible');
    });
    it('should render - right', () => {
        mount(<Default side="right" />);
        cy.get('[data-testid="ToggleDrawer"]').click();
        cy.wait(500);
        cy.get('[data-testid="Drawer"]').should('be.visible');
        cy.get('[data-testid="ToggleDrawerInside"]').click();
        cy.wait(500);
        cy.get('[data-testid="Drawer"]').should('not.be.visible');
    });
});