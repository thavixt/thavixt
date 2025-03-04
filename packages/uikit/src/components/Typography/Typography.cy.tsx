import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Typography.stories';

const { Default } = composeStories(stories);

describe('Typography component', () => {
   it('should render', () => {
      mount(<Default />);
   });
});