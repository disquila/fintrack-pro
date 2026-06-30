import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  envDir: path.resolve(__dirname, 'config'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
  },
  optimizeDeps: {
    exclude: ['@fintrack-pro/shared', '@fintrack-pro/entities', '@fintrack-pro/features', '@fintrack-pro/app'],
  },
});
