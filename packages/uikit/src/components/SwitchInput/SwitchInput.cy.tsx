import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './SwitchInput.stories';

const { Default } = composeStories(stories);

describe('SwitchInput component', () => {
   it('should render', () => {
      mount(<Default />);
   });
});