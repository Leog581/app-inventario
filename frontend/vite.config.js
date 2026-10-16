import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';   // ← 1. Importamos el plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()   // ← 2. Lo agregamos al array de plugins
  ],
  server: {
    port: 5173,
    proxy: {
      // Todo lo que empiece con /api se redirige al backend
      '/api': 'http://127.0.0.1:3000'
    }
  }
});