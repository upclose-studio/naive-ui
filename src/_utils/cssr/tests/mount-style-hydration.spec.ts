import { c } from '../index'
import { DATA_CSSR_ID_ATTR, mountStyle } from '../mount-style'

describe('mountStyle client hydration guard', () => {
  it('skips DOM insertion when data-cssr-id already exists', () => {
    document.head.innerHTML = ''
    const existing = document.createElement('style')
    existing.setAttribute(DATA_CSSR_ID_ATTR, 'n-button')
    existing.textContent = '.n-button { color: red; }'
    document.head.appendChild(existing)

    const node = c('.n-button', 'color: blue;')
    mountStyle(node, { id: 'n-button', head: true, componentId: 'n-button' })

    const styles = document.head.querySelectorAll('style')
    expect(styles).toHaveLength(1)
    expect(styles[0].textContent).toBe('.n-button { color: red; }')
  })
})
