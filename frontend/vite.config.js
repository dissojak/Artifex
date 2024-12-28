import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [], // No need to pre-bundle axios now
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase the chunk size warning limit to 1MB
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Create a vendor chunk for libraries like react and react-dom
        },
      },
    },
  },
  server: {
    port: 3000, // Development port
    proxy: {
      '/api': {
        target: 'https://artifex-backend-weld.vercel.app/', // Proxy API calls to the backend in production
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix
      },
    },
  },
});
