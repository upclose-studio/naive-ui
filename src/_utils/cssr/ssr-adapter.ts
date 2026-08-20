import type { App } from 'vue'
import { inject } from 'vue'
import { DATA_CSSR_ID_ATTR } from './mount-style'

/**
 * Same inject key as `@css-render/vue3-ssr` so existing `setup()`
 * callers and this fork's collector share one context.
 */
export const ssrContextKey = '@css-render/vue3-ssr'

export interface CssrSsrContext {
  styles: string[]
  ids: Set<string>
}

function createStyleString(id: string, style: string): string {
  return `<style cssr-id="${id}" ${DATA_CSSR_ID_ATTR}="${id}">\n${style}\n</style>`
}

function collectStyle(
  id: string,
  style: string,
  context: CssrSsrContext
): void {
  if (context.ids.has(id))
    return
  context.ids.add(id)
  context.styles.push(createStyleString(id, style))
}

const isBrowser = typeof document !== 'undefined'

export function useSsrAdapter():
  | { adapter: (id: string, style: string) => void, context: CssrSsrContext }
  | undefined {
  if (isBrowser)
    return undefined
  const context = inject<CssrSsrContext | null>(ssrContextKey, null)
  if (context === null)
    return undefined
  return {
    adapter: (id, style) => collectStyle(id, style, context),
    context
  }
}

export function setup(app: App): { collect: () => string } {
  const styles: string[] = []
  const ssrContext: CssrSsrContext = {
    styles,
    ids: new Set()
  }
  app.provide(ssrContextKey, ssrContext)
  return {
    collect() {
      const res = styles.join('\n')
      styles.length = 0
      return res
    }
  }
}
