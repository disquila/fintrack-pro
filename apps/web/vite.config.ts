import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@fintrack/core': path.resolve(__dirname, '../../packages/core/src'),
      '@fintrack/ui-kit': path.resolve(__dirname, '../../packages/ui-kit/src'),
      '@fintrack/store': path.resolve(__dirname, '../../packages/store/src'),
      '@fintrack/api': path.resolve(__dirname, '../../packages/api/src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
