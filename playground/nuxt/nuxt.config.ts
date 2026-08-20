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
    }
  },
  nitro: {
    preset: 'node-server'
  },
  compatibilityDate: '2026-08-20'
})
