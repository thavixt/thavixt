import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Tree.stories';

const { Default } = composeStories(stories);

describe('Tree component', () => {
   it('should render', () => {
      mount(<Default />);
   });
});