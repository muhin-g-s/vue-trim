import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

import VueTrimPlugin from '../../packages/@extensions/vite-plugin-vue-trim';

const dirname = path.dirname(fileURLToPath(new URL(import.meta.url)))

export default defineConfig({
  resolve: {
    alias: {
      'vue-trim': path.resolve(dirname, '../../packages'),
    },
  },
  plugins: [VueTrimPlugin()],
})