import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Tooltip.stories';

const { Default } = composeStories(stories);

describe('Tooltip component', () => {
   it('should render', () => {
      mount(<Default />);
   });
});