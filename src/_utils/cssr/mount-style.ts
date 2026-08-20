import type { CNode, CRenderProps, SsrAdapter } from 'css-render'
import { createSsrStyleCacheKey, ssrStyleCache } from './ssr-style-cache'

export const CSSR_ID_ATTR = 'cssr-id'
export const DATA_CSSR_ID_ATTR = 'data-cssr-id'

export interface CachedMountOptions {
  id: string
  head?: boolean
  anchorMetaName?: string
  props?: CRenderProps
  ssr?: SsrAdapter
  parent?: ParentNode
  themeName?: string
  themeOverrides?: unknown
  componentId?: string
}

function queryExistingStyle(id: string, parent?: ParentNode): Element | null {
  if (typeof document === 'undefined')
    return null
  const root: ParentNode | Document = parent ?? document
  return (
    root.querySelector?.(`style[${DATA_CSSR_ID_ATTR}="${id}"]`)
    ?? root.querySelector?.(`style[${CSSR_ID_ATTR}="${id}"]`)
    ?? null
  )
}

/**
 * Mount a css-render CNode with:
 * - SSR LRU cache keyed by theme + overrides + component id
 * - Client hydration guard that skips DOM insertion when the
 *   server already emitted `style[data-cssr-id]` / `style[cssr-id]`
 */
export function mountStyle(style: CNode, options: CachedMountOptions): void {
  const componentId = options.componentId ?? options.id
  const cacheKey = createSsrStyleCacheKey(
    options.themeName,
    options.themeOverrides,
    componentId
  )

  if (options.ssr) {
    const cached = ssrStyleCache.get(cacheKey)
    if (cached !== undefined) {
      options.ssr.adapter(options.id, cached)
      return
    }
    const css = style.render(options.props)
    ssrStyleCache.set(cacheKey, css)
    options.ssr.adapter(options.id, css)
    return
  }

  if (queryExistingStyle(options.id, options.parent))
    return

  style.mount({
    id: options.id,
    head: options.head,
    anchorMetaName: options.anchorMetaName,
    props: options.props,
    parent: options.parent
  })
}

export { queryExistingStyle }
