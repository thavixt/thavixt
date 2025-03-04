import {composeStories} from '@storybook/react';
import {mount} from '@cypress/react';
import * as stories from './Form.stories';

const { Default } = composeStories(stories);

describe('Form component', () => {
   it('should render', () => {
       // and mount the story using @cypress/react library
       mount(<Default />);
   });
});