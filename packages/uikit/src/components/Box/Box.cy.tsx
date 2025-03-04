import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './Box.stories';

const { Example } = composeStories(stories);

describe('Box component', () => {
   it('should render - card', () => {
      mount(<Example type='card' />);
   });
   it('should render - paper', () => {
      mount(<Example type='paper' />);
   });
});