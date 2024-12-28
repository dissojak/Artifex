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
    rollupOptions: {
      external: [], // Ensure axios is bundled
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: strip /api if necessary
      },
    },
  },
});
