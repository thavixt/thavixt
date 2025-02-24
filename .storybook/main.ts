import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  "stories": [
    '../packages/uikit/src/Readme.mdx',
    "../packages/uikit/**/*.stories.mdx",
    "../packages/uikit/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
