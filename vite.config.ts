import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        // Ensure sw.js is processed if referenced, though usually it should be in public/
        // For this structure, we rely on index.html linkage or manual service worker registration path
      }
    }
  }
});