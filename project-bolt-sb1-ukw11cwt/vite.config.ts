import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Exclude specific files from build
      external: [
        'lucide-react',
        /redirects\.wasm/,
        /netlify-redirector/
      ]
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
