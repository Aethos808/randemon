import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ['./vitest.setup.ts'],
    env: {
      APP_ENV: 'test',
    },
    workspace: [
      {
        extends: true,
        plugins: [react()],
        test: {
          globals: true,
          include: ['**/*.browser.test.{ts,tsx}'],
          setupFiles: ['./vitest.browser.setup.ts'],
          name: 'browser',
          environment: 'jsdom',
        },
      },
      {
        extends: true,
        test: {
          include: ['**/*.node.test.ts'],
          name: 'node',
          environment: 'node',
        },
      },
    ],
  },
});
