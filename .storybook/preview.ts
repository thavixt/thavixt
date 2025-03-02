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
    // docs: {
    //   source: {
    //     type: 'auto' // 'code'
    //   }
    // },
    // storySort: {
    //   method: 'alphabetical',
    //   includeNames: true,
    //   order: [
    //     'Basic',
    //     'Data display',
    //     'Feedback',
    //     'Illustration',
    //     'Input',
    //     'Layout',
    //     'Navigation',
    //     'Utility',
    //   ],
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
