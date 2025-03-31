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
  },
  // decorators: [
  //   (Story, args) => (
  //     <div data-theme={args.globals.theme} className='themeWrapper'>
  //       <Story />
  //     </div>
  //   ),
  // ],
};

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
    attributeName: 'data-theme', // handled with a custom decorator instead
  }),
];

export default preview;
