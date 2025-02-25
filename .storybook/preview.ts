import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from "@storybook/react";

import './preview.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // storySort: {
    //   method: 'alphabetical',
    //   includeNames: true,
    //   order: ['Basic', 'Input', 'Utility'],
    // },
  },
};

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
