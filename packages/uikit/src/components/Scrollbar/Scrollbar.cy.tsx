import {composeStories} from '@storybook/react';
import {mount} from '@cypress/react';
import * as stories from './Scrollbar.stories';

const { Default } = composeStories(stories);

describe('Scrollbar component', () => {
   it('should render', () => {
       // and mount the story using @cypress/react library
       mount(<Default />);
   });
});