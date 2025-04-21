import { withThemeByDataAttribute } from '@storybook/addon-themes';
import * as DocBlock from '@storybook/blocks';
import type { Preview } from "@storybook/react";
import React from 'react';

import './preview.css';
import { storyModes } from './modes';

const docsPage = () => (
  <>
    <DocBlock.Title />
    <DocBlock.Description />
    <DocBlock.Primary />
    <DocBlock.Controls />
    {/* <DocBlock.Source /> */}
    {/* <DocBlock.Stories /> */}
  </>
);

const preview: Preview = {
  parameters: {
    docs: { page: docsPage },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
        radio: /(type|variant)$/i,
      },
    },
    chromatic: {
      modes: {
        light: storyModes['light'],
        dark: storyModes['dark'],
      },
    },
  },
  // decorators: [
  //   (Story, args) => (
  //     <div data-theme={args.globals.theme} className='themeStoryDecorator'>
  //       <Story />
  //     </div>
  //   ),
  // ],
};

// https://github.com/storybookjs/storybook/blob/next/code/addons/themes/docs/api.md
export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
    attributeName: 'data-theme',
  }),
];

export default preview;
