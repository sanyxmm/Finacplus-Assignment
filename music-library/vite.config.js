import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'music_library',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.jsx', // expose main App
      },
      shared: ['react', 'react-dom', 'tailwindcss'], // ensure shared
    }),
  ],
  server: { port: 5001 },
  build: {
    target: 'esnext',
    cssCodeSplit: false, // ensure Tailwind CSS bundled inside remoteEntry.js
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]', // images proper path
      },
    },
  },
})
