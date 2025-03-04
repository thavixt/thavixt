import {composeStories} from '@storybook/react';
import {mount} from '@cypress/react';
import * as stories from './Divider.stories';

const { Default } = composeStories(stories);

describe('Divider component', () => {
   it('should render', () => {
       // and mount the story using @cypress/react library
       mount(<Default />);
   });
});