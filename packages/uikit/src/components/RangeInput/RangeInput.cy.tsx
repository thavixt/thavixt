import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './RangeInput.stories';

const { Default } = composeStories(stories);

describe('RangeInput component', () => {
   it('should render', () => {
      mount(<Default />);
   });
});