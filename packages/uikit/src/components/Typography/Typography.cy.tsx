import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Typography.stories';

const { Variants } = composeStories(stories);

describe('Typography component', () => {
   it('should render', () => {
      mount(<Variants />);
   });
});