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
    coverage: {
      provider: 'c8',
      all: true,
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'tests/**/*.{js,jsx,ts,tsx}',
        'src/**/*.d.ts',
        'src/**/*.test.tsx',
        'src/__cy_unit_tests__',
        'src/interfaces.ts',
      ],
    },
    environment: 'jsdom',
    setupFiles: ['./tests-setup.ts'],
  },
});
