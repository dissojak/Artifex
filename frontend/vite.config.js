import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      axios: 'axios', // Alias for axios (no need for require.resolve in ESM)
    },
  },
  optimizeDeps: {
    include: ['axios'], // Pre-bundle axios
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase the chunk size warning limit to 1MB
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'axios'], // Create a vendor chunk for libraries like react, react-dom, and axios
        },
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        // Use an environment variable for the backend URL
        target: 'https://artifex-backend-weld.vercel.app/' || 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: strip /api if necessary
      },
    },
  },
});
