import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'

const repoRoot = fileURLToPath(new URL('../..', import.meta.url))

export default defineNuxtConfig({
  modules: ['naive-ui-nuxt'],
  alias: {
    'naive-ui': repoRoot
  },
  vite: {
    resolve: {
      alias: {
        'naive-ui': repoRoot
      }
    },
    ssr: {
      // @juggle/resize-observer exports a local `process()` helper. If Nitro
      // inlines it into a chunk that also `import process from 'node:process'`,
      // Node throws "Identifier 'process' has already been declared".
      external: ['@juggle/resize-observer']
    }
  },
  nitro: {
    preset: 'node-server',
    externals: {
      external: ['@juggle/resize-observer']
    }
  },
  compatibilityDate: '2026-08-20'
})
