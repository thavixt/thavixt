import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Link.stories';

const { Default } = composeStories(stories);

describe('Link component', () => {
   it('should render', () => {
      mount(<Default />);
   });
});