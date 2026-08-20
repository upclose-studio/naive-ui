import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'

const repoRoot = fileURLToPath(new URL('../..', import.meta.url))

export default defineNuxtConfig({
  modules: ['naive-ui-nuxt'],
  alias: {
    'naive-ui': `${repoRoot}/src`,
    'naive-ui/es': `${repoRoot}/src`
  },
  vite: {
    resolve: {
      alias: {
        'naive-ui': `${repoRoot}/src`,
        'naive-ui/es': `${repoRoot}/src`
      }
    }
  },
  nitro: {
    preset: 'node-server'
  },
  compatibilityDate: '2026-08-20'
})
