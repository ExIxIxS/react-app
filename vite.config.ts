/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  server: {
    open: true,
    host: true,
    port: 5180,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests-setup.ts'],
  },
});
