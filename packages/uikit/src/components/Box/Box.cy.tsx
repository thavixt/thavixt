import {composeStories} from '@storybook/react';
import {mount} from '@cypress/react';
import * as stories from './Box.stories';

const { Default } = composeStories(stories);

describe('Box component', () => {
   it('should render', () => {
       // and mount the story using @cypress/react library
       mount(<Default />);
   });
});