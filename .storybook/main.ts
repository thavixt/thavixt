import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  core: {
    disableTelemetry: true,
  },
  framework: getAbsolutePath("@storybook/react-vite"),
  stories: [
    '../packages/uikit/src/Readme.mdx',
    // "../packages/uikit/src/components/**/*.stories.mdx",
    "../packages/uikit/src/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-themes"),
    // {
    //   name: getAbsolutePath("@storybook/addon-docs"),
    //   options: { transcludeMarkdown: true }
    // },
  ],
  docs: {
    defaultName: 'Overview',
  },
  // better then the default react-docgen
  // https://github.com/storybookjs/storybook/issues/25305
  // https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#react-docgen-component-analysis-by-default
  typescript: {
    reactDocgen: "react-docgen-typescript",
  }
};
export default config;

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, "package.json")));
}
