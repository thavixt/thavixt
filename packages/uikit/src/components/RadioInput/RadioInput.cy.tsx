import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './RadioInput.stories';

const { Default } = composeStories(stories);

describe('RadioInput component', () => {
   it('should render', () => {
      mount(<Default />);
   });
});