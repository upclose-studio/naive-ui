import { defineNuxtPlugin } from '#app'

const DATA_CSSR_ID_ATTR = 'data-cssr-id'

/**
 * Client hydration guard: server-injected `<style data-cssr-id>`
 * tags stay in the document. css-render mount is skipped when a
 * matching node already exists (see `mountStyle`).
 */
export default defineNuxtPlugin(() => {
  if (typeof document === 'undefined')
    return
  const existing = document.querySelectorAll(`style[${DATA_CSSR_ID_ATTR}]`)
  for (const el of existing) {
    const id = el.getAttribute(DATA_CSSR_ID_ATTR)
    if (id && !el.getAttribute('cssr-id'))
      el.setAttribute('cssr-id', id)
  }
})
