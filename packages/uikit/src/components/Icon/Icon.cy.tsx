import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Icon.stories';

const { All } = composeStories(stories);

describe('Icon component', () => {
   it('should render - all', () => {
      mount(<All />);
   });
});