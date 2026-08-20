import { defineNuxtPlugin, useRequestEvent } from '#app'
import { setup } from 'naive-ui'

export default defineNuxtPlugin((nuxtApp) => {
  const { collect } = setup(nuxtApp.vueApp)

  nuxtApp.hook('app:rendered', () => {
    const styles = collect()
    const event = useRequestEvent()
    if (event) {
      event.context.naiveUiStyles = styles
    }
  })
})
