import {composeStories} from '@storybook/react';
import {mount} from '@cypress/react';
import * as stories from './Snackbar.stories';

const { Default } = composeStories(stories);

describe('Snackbar component', () => {
   it('should render', () => {
       // and mount the story using @cypress/react library
       mount(<Default />);
   });
});