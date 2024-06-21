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
    }
  },
  build: {
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    outDir: 'menu',
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


