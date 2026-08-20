import type { CNode, CProperties } from 'css-render'
import { plugin as BemPlugin } from '@css-render/plugin-bem'
import { CssRender } from 'css-render'

const namespace = 'n'
const prefix = `.${namespace}-`
const elementPrefix = '__'
const modifierPrefix = '--'

const cssr = CssRender()
const plugin = BemPlugin({
  blockPrefix: prefix,
  elementPrefix,
  modifierPrefix
})
cssr.use(plugin)
const { c, find } = cssr
const { cB, cE, cM, cNotM } = plugin

function insideModal(style: CNode): CNode {
  return c(
    ({ props: { bPrefix } }) =>
      `${bPrefix || prefix}modal, ${bPrefix || prefix}drawer`,
    [style]
  )
}

function insidePopover(style: CNode): CNode {
  return c(({ props: { bPrefix } }) => `${bPrefix || prefix}popover`, [style])
}

function asModal(style: CProperties): CNode {
  return c(({ props: { bPrefix } }) => `&${bPrefix || prefix}modal`, style)
}

// child block
const cCB: typeof cB = ((...args: any[]) => {
  return c('>', [(cB as any)(...args)])
}) as any

function createKey<P extends string, S extends string>(
  prefix: P,
  suffix: S
): S extends 'default' ? P : `${P}${Capitalize<S>}` {
  return (prefix
    + (suffix === 'default'
      ? ''
      : suffix.replace(/^[a-z]/, startChar =>
          startChar.toUpperCase()))) as any
}

export { LruCache } from './lru-cache'
export {
  CSSR_ID_ATTR,
  DATA_CSSR_ID_ATTR,
  mountStyle,
  queryExistingStyle
} from './mount-style'
export type { CachedMountOptions } from './mount-style'
export { setup, ssrContextKey, useSsrAdapter } from './ssr-adapter'
export type { CssrSsrContext } from './ssr-adapter'
export {
  createSsrStyleCacheKey,
  SSR_STYLE_CACHE_MAX,
  ssrStyleCache
} from './ssr-style-cache'

export {
  asModal,
  c,
  cB,
  cCB,
  cE,
  cM,
  cNotM,
  createKey,
  find,
  insideModal,
  insidePopover,
  namespace,
  prefix
}
