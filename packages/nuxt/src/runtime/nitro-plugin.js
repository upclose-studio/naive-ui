import { defineNitroPlugin } from 'nitropack/runtime'

/**
 * Inject collected css-render style tags into the HTML head.
 * Tags already carry `data-cssr-id` from the SSR adapter.
 *
 * This file is plain JavaScript on purpose. Nitro's Rollup pipeline
 * (including rollup-plugin-inject) parses server plugins from
 * node_modules as JS and fails on TypeScript `as` assertions.
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    const styles = event.context.naiveUiStyles
    if (!styles)
      return
    html.head.push(styles)
  })
})
