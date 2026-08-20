# Nuxt.js

This fork ships `naive-ui-nuxt` for Nuxt 3/4. It injects css-render styles during Nitro `render:html` and skips client remount when `data-cssr-id` tags already exist.

## Setup

```json
{
  "dependencies": {
    "naive-ui": "https://github.com/upclose-studio/naive-ui/releases/download/v1.0.1/naive-ui-1.0.1.tgz",
    "naive-ui-nuxt": "https://github.com/upclose-studio/naive-ui/releases/download/v1.0.1/naive-ui-nuxt-1.0.1.tgz"
  }
}
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['naive-ui-nuxt']
})
```

Components are registered with `addComponent` so unused ones stay out of the client bundle.

```vue
<template>
  <n-config-provider>
    <n-button type="primary">
      Hello
    </n-button>
    <n-date-picker />
  </n-config-provider>
</template>
```

See the [SSR caveats](ssr#Caveat) before deploying.
