import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Table.stories';

const { Default } = composeStories(stories);

describe('Table component', () => {
   it('should render', () => {
      mount(<Default />);
   });
});