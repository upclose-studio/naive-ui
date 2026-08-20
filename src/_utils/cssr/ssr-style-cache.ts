import { hash } from 'css-render'
import { LruCache } from './lru-cache'

export const SSR_STYLE_CACHE_MAX = 500

/**
 * Process-wide cache of serialized css-render output.
 * Shared across SSR requests so static / global styles are not
 * re-allocated or re-traversed per request.
 */
export const ssrStyleCache = new LruCache<string>(SSR_STYLE_CACHE_MAX)

export function createSsrStyleCacheKey(
  themeName: string | undefined,
  themeOverrides: unknown,
  componentId: string
): string {
  return hash(
    `${themeName ?? ''}${JSON.stringify(themeOverrides ?? null)}${componentId}`
  )
}
