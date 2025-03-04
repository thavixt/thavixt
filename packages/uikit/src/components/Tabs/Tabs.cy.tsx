import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Tabs.stories';

const { Default } = composeStories(stories);

describe('Tabs component', () => {
   it('should render', () => {
      mount(<Default />);
   });
});