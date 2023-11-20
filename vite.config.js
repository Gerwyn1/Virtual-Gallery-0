import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({
    // Add this line
    include: "**/*.jsx",
  })],
  server: {
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      '@src': '/src',
      '@components': '/src/components',
      '@views': '/src/views',
      '@assets': '/src/assets',
      '@scss': '/src/scss',
      '@layout': '/src/layout',
      // Add more aliases as needed
    },
  },
});