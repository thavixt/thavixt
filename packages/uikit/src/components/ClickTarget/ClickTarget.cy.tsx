import { mount } from '@cypress/react';
import { ClickTarget } from './ClickTarget';

describe('ClickTarget component', () => {
    it('should render', () => {
        const onClickOutside = cy.spy().as('onClickOutside');
        const onClickInside = cy.spy().as('onClickInside');

        mount(
            <div>
                <div data-testid="outside">asd</div>
                <ClickTarget onClickOutside={onClickOutside} onClickInside={onClickInside}>
                    <span data-testid="inside">hello world</span>
                </ClickTarget>
            </div>
        );

        cy.get('[data-testid="outside"]').click();
        cy.get('@onClickOutside').should('be.calledOnce');
        cy.get('[data-testid="inside"]').click();
        cy.get('@onClickInside').should('be.calledOnce');
    });
});