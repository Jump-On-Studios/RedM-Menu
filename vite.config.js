import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  define: {
    'process.env': process.env
  },
  plugins: [vue()],
  resolve: {
    alias: {
      util: "util/",
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    outDir: 'build',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: () => {
          return `assets/[name][extname]`;
        },
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js',
      }
    },
  },
})


