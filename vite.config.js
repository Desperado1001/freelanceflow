import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 在Vercel上使用根路径
  base: '/',
  build: {
    outDir: 'dist',
  },
});