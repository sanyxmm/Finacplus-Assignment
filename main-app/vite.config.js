import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: 'main_app',
        remotes: {
          music_library: env.VITE_MUSIC_LIBRARY_URL, // full URL to remoteEntry.js
        },
        shared: ['react', 'react-dom', 'tailwindcss'],
      }),
    ],
    server: { port: 5000 },
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false, // ensures host CSS works well
    },
  };
});
