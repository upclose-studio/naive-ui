import {
  addComponent,
  addPlugin,
  addServerPlugin,
  createResolver,
  defineNuxtModule
} from '@nuxt/kit'
import { naiveComponents } from './components'

export interface NaiveUiNuxtOptions {
  /**
   * Register Naive UI components via `addComponent` so unused
   * components are omitted from the client bundle.
   * @default true
   */
  autoImport?: boolean
}

export default defineNuxtModule<NaiveUiNuxtOptions>({
  meta: {
    name: 'naive-ui',
    configKey: 'naiveui'
  },
  defaults: {
    autoImport: true
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.build.transpile.push(
      'naive-ui',
      'vueuc',
      'seemly',
      'date-fns',
      '@date-fns/tz',
      'css-render',
      '@css-render/vue3-ssr',
      'evtd',
      'vooks'
    )

    if (options.autoImport) {
      for (const component of naiveComponents) {
        addComponent({
          name: component.name,
          export: component.export,
          filePath: `naive-ui/es/${component.dir}`
        })
      }
    }

    addPlugin({
      src: resolver.resolve('./runtime/plugin.server'),
      mode: 'server'
    })
    addPlugin({
      src: resolver.resolve('./runtime/plugin.client'),
      mode: 'client'
    })
    addServerPlugin(resolver.resolve('./runtime/nitro-plugin'))
  }
})
