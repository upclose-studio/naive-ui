import { defineNitroPlugin } from 'nitropack/runtime'

/**
 * Inject collected css-render style tags into the HTML head.
 * Tags already carry `data-cssr-id` from the SSR adapter.
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    const styles = event.context.naiveUiStyles as string | undefined
    if (!styles)
      return
    html.head.push(styles)
  })
})
