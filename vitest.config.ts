import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['./packages/uikit/src/**/*.spec.ts'],
    globals: true,
    coverage: {
      exclude: [
        '**/.{idea,git,cache,output,temp,storybook,vercel}/**',
        '**/cypress/**',
        '**/coverage/**',
        '**/dist/**',
        '**/node_modules/**',
        '**/uikit-website/**',
        '**/storybook-static/**',
        '**/*.{cy,spec,stories}.*',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*']
    }
  },
})