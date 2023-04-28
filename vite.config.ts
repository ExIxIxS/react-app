/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  /*
  build: {
    outDir: 'dist', // specify the output directory for built files
    assetsDir: 'assets', // specify the assets directory for static assets
    rollupOptions: {
      // configure rollup options
      output: {
        entryFileNames: 'clientBundle.js', // specify the filename pattern for entry files
        chunkFileNames: 'chunkBundle.[hash].js', // specify the filename pattern for chunk files
        assetFileNames: 'bundle.[hash].[ext]', // specify the filename pattern for asset files
      },
    },
  },
  */
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests-setup.ts'],
  },
});
