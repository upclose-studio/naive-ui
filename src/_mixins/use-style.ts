import type { CNode } from 'css-render'
import type { Ref } from 'vue'
import { inject, onBeforeMount } from 'vue'
import globalStyle from '../_styles/global/index.cssr'
import { mountStyle as mountCachedStyle, useSsrAdapter } from '../_utils/cssr'
import { throwError } from '../_utils/naive/warn'
import { configProviderInjectionKey } from '../config-provider/src/context'
import { cssrAnchorMetaName } from './common'

export default function useStyle(
  mountId: string,
  style: CNode,
  clsPrefixRef: Ref<string | undefined>
): void {
  if (!style) {
    if (__DEV__)
      throwError('use-style', 'No style is specified.')
    return
  }
  const ssrAdapter = useSsrAdapter()
  const NConfigProvider = inject(configProviderInjectionKey, null)
  const doMountStyle = (): void => {
    const clsPrefix = clsPrefixRef.value
    const themeName = NConfigProvider?.mergedThemeRef.value?.name
    const themeOverrides = NConfigProvider?.mergedThemeOverridesRef.value
    const id = clsPrefix === undefined ? mountId : clsPrefix + mountId
    mountCachedStyle(style, {
      id,
      head: true,
      anchorMetaName: cssrAnchorMetaName,
      props: {
        bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined
      },
      ssr: ssrAdapter,
      parent: NConfigProvider?.styleMountTarget,
      themeName,
      themeOverrides,
      componentId: id
    })
    if (!NConfigProvider?.preflightStyleDisabled) {
      mountCachedStyle(globalStyle, {
        id: 'n-global',
        head: true,
        anchorMetaName: cssrAnchorMetaName,
        ssr: ssrAdapter,
        parent: NConfigProvider?.styleMountTarget,
        themeName,
        themeOverrides,
        componentId: 'n-global'
      })
    }
  }
  if (ssrAdapter) {
    doMountStyle()
  }
  else {
    onBeforeMount(doMountStyle)
  }
}
