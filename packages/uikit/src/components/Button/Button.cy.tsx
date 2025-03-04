import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Button.stories';

const { All } = composeStories(stories);

describe('Button component', () => {
   it('should render', () => {
      mount(<All />);
   });
});