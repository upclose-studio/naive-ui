# naive-ui-nuxt

Nuxt 3/4 module for this Naive UI performance fork.

- Collects css-render SSR styles and injects them in `render:html`
- Preserves `data-cssr-id` tags on the client (zero-FOUC hydration)
- Registers components with `addComponent` so unused ones stay out of the client bundle

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

```vue
<template>
  <n-config-provider>
    <n-button type="primary">
      Hello
    </n-button>
  </n-config-provider>
</template>
```
