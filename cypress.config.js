import { defineConfig } from "cypress";
import { defineConfig as viteDefineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  component: {
    screenshotsFolder: 'cypress/screenshots',
    // trashAssetsBeforeRuns: false,
    specPattern: 'packages/uikit/src/components/**/*.cy.tsx',
    devServer: {
      framework: "react",
      bundler: "vite",
      // optionally pass in vite config
      viteConfig: viteDefineConfig({
        plugins: [
          react(),
          tailwindcss(),
        ],
        // root: './storybook-static',
      }),
    },
  },
});
