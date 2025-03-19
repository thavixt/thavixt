import { defineConfig } from "cypress";
import { defineConfig as viteDefineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  retries: 10,
  video: false,
  component: {
    specPattern: 'packages/uikit/src/components/**/*.cy.tsx',
    watchForFileChanges: true,
    screenshotsFolder: 'cypress/screenshots',
    // experimentalInteractiveRunEvents: true,
    // trashAssetsBeforeRuns: true,
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
    setupNodeEvents(on, config) {
      on('after:spec', (spec) => {
        console.log('spec ran', spec)
      });
      on('after:run', (spec) => {
        console.log('run finished', spec)
      });
      return config;
    },
  },
});
