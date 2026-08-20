# naive-ui-nuxt

Nuxt 3/4 module for this Naive UI performance fork.

- Collects css-render SSR styles and injects them in `render:html`
- Preserves `data-cssr-id` tags on the client (zero-FOUC hydration)
- Registers components with `addComponent` so unused ones stay out of the client bundle

## Setup

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
