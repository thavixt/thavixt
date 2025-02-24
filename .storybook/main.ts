import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  "stories": [
    '../packages/uikit/src/Readme.mdx',
    "../packages/uikit/src/components/**/*.stories.mdx",
    "../packages/uikit/src/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-themes"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
