import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './SelectInput.stories';

const { Default } = composeStories(stories);

describe('SelectInput component', () => {
   it('should render', () => {
      mount(<Default />);
   });
});