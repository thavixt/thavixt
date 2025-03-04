import {composeStories} from '@storybook/react';
import {mount} from '@cypress/react';
import * as stories from './TextInput.stories';

const { Default } = composeStories(stories);

describe('TextInput component', () => {
   it('should render', () => {
       // and mount the story using @cypress/react library
       mount(<Default />);
   });
});