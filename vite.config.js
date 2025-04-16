import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/freelanceflow/',
  // GitHub Pages 需要确保路由正确工作
  build: {
    outDir: 'dist',
  },
});