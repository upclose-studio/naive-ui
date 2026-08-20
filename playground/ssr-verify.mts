/**
 * Standalone SSR verification for the css-render collector + LRU cache.
 * Run: pnpm exec tsx playground/ssr-verify.mts
 */
import process from 'node:process'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, defineComponent, h, ref } from 'vue'
import { setup, ssrStyleCache } from '../src/_utils/cssr'
import { NButton } from '../src/button'
import { NConfigProvider } from '../src/config-provider'
import { NDataTable } from '../src/data-table'
import { NDatePicker } from '../src/date-picker'
import { darkTheme } from '../src/themes'

const Playground = defineComponent({
  setup() {
    const isDark = ref(false)
    return { isDark }
  },
  render() {
    return h(
      NConfigProvider,
      { theme: this.isDark ? darkTheme : null },
      {
        default: () => [
          h(NButton, { type: 'primary' }, { default: () => 'Toggle' }),
          h(NDatePicker),
          h(NDataTable, {
            columns: [
              { title: 'Name', key: 'name' },
              { title: 'Age', key: 'age' }
            ],
            data: [
              { name: 'Alice', age: 24 },
              { name: 'Bob', age: 31 }
            ]
          })
        ]
      }
    )
  }
})

async function renderOnce(): Promise<string> {
  const app = createSSRApp(Playground)
  const { collect } = setup(app)
  await renderToString(app)
  return collect()
}

async function main(): Promise<void> {
  ssrStyleCache.clear()
  const first = await renderOnce()
  const sizeAfterFirst = ssrStyleCache.size
  const second = await renderOnce()

  if (!first.includes('data-cssr-id="')) {
    throw new Error('SSR styles missing data-cssr-id')
  }
  if (!first.includes('<style')) {
    throw new Error('SSR styles missing <style> tags')
  }
  if (first !== second) {
    throw new Error('SSR style cache produced different markup across requests')
  }
  if (ssrStyleCache.size !== sizeAfterFirst || sizeAfterFirst === 0) {
    throw new Error('SSR style cache did not reuse entries across requests')
  }

  process.stdout.write(
    [
      'SSR verification passed',
      `style tags: ${(first.match(/<style /g) || []).length}`,
      `cache entries: ${ssrStyleCache.size}`,
      first.slice(0, 280)
    ].join('\n')
  )
}

void main()
