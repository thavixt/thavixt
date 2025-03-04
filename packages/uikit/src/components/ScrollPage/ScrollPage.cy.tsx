import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './ScrollPage.stories';

const { Default } = composeStories(stories);

describe('ScrollPage component', () => {
   it('should render', () => {
      mount(<Default />);
   });
});