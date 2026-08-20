import { renderToString } from '@vue/server-renderer'
/**
 * @vitest-environment node
 */
import { createSSRApp, h } from 'vue'
import { NButton } from '../../../button'
import { NConfigProvider } from '../../../config-provider'
import { darkTheme } from '../../../themes'
import { c } from '../index'
import { mountStyle } from '../mount-style'
import { setup } from '../ssr-adapter'
import {
  createSsrStyleCacheKey,
  SSR_STYLE_CACHE_MAX,
  ssrStyleCache
} from '../ssr-style-cache'

describe('ssr style cache', () => {
  beforeEach(() => {
    ssrStyleCache.clear()
  })

  it('creates a deterministic key from theme + overrides + id', () => {
    const a = createSsrStyleCacheKey(
      'dark',
      { Button: { color: 'red' } },
      'n-button'
    )
    const b = createSsrStyleCacheKey(
      'dark',
      { Button: { color: 'red' } },
      'n-button'
    )
    const cKey = createSsrStyleCacheKey(
      'light',
      { Button: { color: 'red' } },
      'n-button'
    )
    expect(a).toBe(b)
    expect(a).not.toBe(cKey)
  })

  it('skips css-render AST render on cache hit', () => {
    const node = c('.n-cache-probe', 'color: red;')
    const renders: string[] = []
    const originalRender = node.render.bind(node)
    node.render = ((props?: unknown) => {
      const css = originalRender(props)
      renders.push(css)
      return css
    }) as typeof node.render

    const collected: Array<[string, string]> = []
    const ssr = {
      adapter: (id: string, style: string) => {
        collected.push([id, style])
      },
      context: { styles: [] as string[], ids: new Set<string>() }
    }

    mountStyle(node, {
      id: 'probe',
      ssr,
      componentId: 'probe',
      themeName: 'light'
    })
    mountStyle(node, {
      id: 'probe',
      ssr,
      componentId: 'probe',
      themeName: 'light'
    })

    expect(renders).toHaveLength(1)
    expect(collected).toHaveLength(2)
    expect(collected[0][1]).toBe(collected[1][1])
    expect(ssrStyleCache.size).toBe(1)
  })

  it('evicts the oldest entry after 500 keys', () => {
    for (let i = 0; i < SSR_STYLE_CACHE_MAX + 1; i++) {
      ssrStyleCache.set(`k-${i}`, `css-${i}`)
    }
    expect(ssrStyleCache.size).toBe(SSR_STYLE_CACHE_MAX)
    expect(ssrStyleCache.get('k-0')).toBeUndefined()
    expect(ssrStyleCache.get(`k-${SSR_STYLE_CACHE_MAX}`)).toBe(
      `css-${SSR_STYLE_CACHE_MAX}`
    )
  })

  it('collects data-cssr-id style tags during renderToString', async () => {
    const app = createSSRApp({
      render() {
        return h(NButton, null, { default: () => 'Hi' })
      }
    })
    const { collect } = setup(app)
    await renderToString(app)
    const styles = collect()
    expect(styles).toContain('data-cssr-id="')
    expect(styles).toContain('cssr-id="')
    expect(styles).toContain('<style')
  })

  it('reuses cached CSS across simulated SSR requests', async () => {
    async function renderOnce(): Promise<string> {
      const app = createSSRApp({
        render() {
          return h(
            NConfigProvider,
            { theme: darkTheme },
            {
              default: () =>
                h(NButton, { type: 'primary' }, { default: () => 'Go' })
            }
          )
        }
      })
      const { collect } = setup(app)
      await renderToString(app)
      return collect()
    }

    const first = await renderOnce()
    const sizeAfterFirst = ssrStyleCache.size
    const second = await renderOnce()

    expect(first).toContain('data-cssr-id="')
    expect(second).toBe(first)
    expect(ssrStyleCache.size).toBe(sizeAfterFirst)
    expect(sizeAfterFirst).toBeGreaterThan(0)
  })
})
