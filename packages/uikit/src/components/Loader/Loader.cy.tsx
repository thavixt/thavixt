import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Loader.stories';

const { All } = composeStories(stories);

describe('Loader component', () => {
   it('should render - all', () => {
      mount(<All />);
   });
});