# Naive UI (Nuxt SSR fork)

Performance-focused fork of [`tusen-ai/naive-ui`](https://github.com/tusen-ai/naive-ui) for **Nuxt 3/4 SSR** and Nitro. Vue 3 + TypeScript, `css-render` styling, English-only documentation.

## Table of Improvements

| Category | Upstream Naive UI | This Fork |
| :-- | :-- | :-- |
| **Target Platform** | General Vue 3 SPA | Nuxt 3/4 SSR & Nitro-first |
| **Date Library** | `date-fns` v2/v3 + `date-fns-tz` | `date-fns` v4 + `@date-fns/tz` |
| **SSR Performance** | Dynamic AST generation per request | Deterministic LRU Style Cache in `css-render` |
| **Tree-Shaking** | Standard barrel exports | Strict ESM subpath exports (`sideEffects: false`) |
| **Hydration** | Re-mounts styles on client | Skips mounting if server styles exist (`data-cssr-id`) |
| **Documentation** | Dual-language (EN / zh-CN) | Lightweight English-only codebase |

Runtime UI locales (including `zhCN`) are still shipped for i18n. Chinese documentation and demo markdown were removed.

## Install from GitHub (not on npm)

This fork is published as GitHub Release tarballs, not on the npm registry. Point your app at `upclose-studio/naive-ui` like this:

```json
{
  "dependencies": {
    "naive-ui": "https://github.com/upclose-studio/naive-ui/releases/download/v1.0.1/naive-ui-1.0.1.tgz",
    "naive-ui-nuxt": "https://github.com/upclose-studio/naive-ui/releases/download/v1.0.1/naive-ui-nuxt-1.0.1.tgz"
  }
}
```

```bash
# bun
bun add https://github.com/upclose-studio/naive-ui/releases/download/v1.0.1/naive-ui-1.0.1.tgz
bun add https://github.com/upclose-studio/naive-ui/releases/download/v1.0.1/naive-ui-nuxt-1.0.1.tgz

# pnpm / npm
pnpm add https://github.com/upclose-studio/naive-ui/releases/download/v1.0.1/naive-ui-1.0.1.tgz
pnpm add https://github.com/upclose-studio/naive-ui/releases/download/v1.0.1/naive-ui-nuxt-1.0.1.tgz
```

Do not use `github:upclose-studio/naive-ui` (git clone). The clone has no `es/` / `lib/` / `dist/` build output.

`naive-ui-nuxt` aliases `@juggle/resize-observer` to [`github:upclose-studio/resize-observer`](https://github.com/upclose-studio/resize-observer). If you use `naive-ui` without the module, add the same override in your app:

```json
{
  "overrides": {
    "@juggle/resize-observer": "github:upclose-studio/resize-observer"
  }
}
```

## Nuxt 3/4 setup

After adding the two tarball dependencies:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['naive-ui-nuxt']
})
```

```vue
<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import { ref } from 'vue'

const isDark = ref(false)
</script>

<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <n-space>
      <n-button type="primary" @click="isDark = !isDark">
        Toggle theme
      </n-button>
      <n-date-picker />
    </n-space>
    <n-data-table :columns="[]" :data="[]" />
  </n-config-provider>
</template>
```

The module:

1. Collects css-render styles during SSR and injects `<style data-cssr-id="...">` into `<head>`
2. Skips client remount when those tags already exist (no FOUC)
3. Registers components with `addComponent` so unused ones are dropped from the client bundle

You can also import components directly from ESM subpaths:

```ts
import { NButton } from 'naive-ui/es/button'
```

## Vue / Vite (without Nuxt)

```bash
pnpm add naive-ui
```

```ts
import { NButton } from 'naive-ui'
import { createApp } from 'vue'

createApp(NButton).mount('#app')
```

SSR without Nuxt:

```ts
import { renderToString } from '@vue/server-renderer'
import { setup } from 'naive-ui'

const { collect } = setup(app)
const html = await renderToString(app)
const styleTags = collect() // includes data-cssr-id
```

## Date utilities

Timezone formatting uses `date-fns` v4 and `@date-fns/tz`. Format tokens are Unicode (`yyyy`, `MM`, `dd`, `HH`, `mm`, `ss`).

## License

MIT
