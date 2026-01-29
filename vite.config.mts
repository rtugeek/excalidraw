import widget from '@widget-js/vite-plugin-widget'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const mode = config.mode
  return {
    base: mode === 'offline' ? './' : '/',
    plugins: [
      widget({
        zipName: 'widget',
        generateZip: mode === 'offline',
      }),
    ],
    publicDir: 'public',
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2022',
        treeShaking: true,
      },
    },
  }
})
