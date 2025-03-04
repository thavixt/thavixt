import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Badge.stories';

const { Default } = composeStories(stories);

describe('Badge component', () => {
   it('should render', () => {
      mount(<Default />);
   });
});