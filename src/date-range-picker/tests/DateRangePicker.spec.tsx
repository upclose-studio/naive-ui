import type { Value } from '../../date-picker/src/interface'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { NDateRangePicker } from '../index'

function valueImportSources(source: string): string[] {
  return Array.from(
    source.matchAll(/^import(?!\s+type\b)[\s\S]*?from\s+['"]([^'"]+)['"]/gm)
  ).map(match => match[1])
}

describe('n-date-range-picker', () => {
  it('should work with import on demand', () => {
    mount(NDateRangePicker).unmount()
  })

  it('defaults to daterange', () => {
    const wrapper = mount(NDateRangePicker)
    expect(wrapper.find('.n-date-picker--range').exists()).toBe(true)
    expect(wrapper.find('.n-input--pair').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with date type', () => {
    const wrapper = mount(NDateRangePicker, {
      props: { type: 'date' }
    })
    expect(wrapper.find('.n-date-picker--range').exists()).toBe(false)
    wrapper.unmount()
  })

  it('daterange shortcuts should work', async () => {
    const test = ref<Value>(0)
    const wrapper = mount(NDateRangePicker, {
      props: {
        value: test.value,
        shortcuts: {
          'Honey birthday': [1629216000000, 1631203200000]
        },
        onUpdateValue: (value: Value) => {
          test.value = value
        }
      }
    })
    await wrapper.find('.n-input').trigger('click')
    expect(document.querySelector('.n-date-panel--daterange')).not.toBeNull()
    expect(document.querySelector('.n-time-picker')).toBeNull()
    const button = document
      .querySelector('.n-date-panel-actions')
      ?.querySelector('.n-button') as HTMLElement
    button.click()
    expect(test.value).toEqual([1629216000000, 1631203200000])
    wrapper.unmount()
  })

  it('does not render datetime panels for unsupported types', async () => {
    const wrapper = mount(NDateRangePicker, {
      props: {
        type: 'datetime' as any
      }
    })
    await wrapper.find('.n-input').trigger('click')
    expect(document.querySelector('.n-time-picker')).toBeNull()
    expect(document.querySelector('.n-date-panel--datetime')).toBeNull()
    wrapper.unmount()
  })

  it('entry graph does not import TimePicker or datetime panels', () => {
    const files = [
      resolve(__dirname, '../src/DateRangePicker.tsx'),
      resolve(__dirname, '../../date-picker/src/create-date-picker.tsx'),
      resolve(__dirname, '../../date-picker/styles/range-light.ts')
    ]
    for (const file of files) {
      const sources = valueImportSources(readFileSync(file, 'utf8'))
      expect(sources.some(source => source.includes('time-picker'))).toBe(
        false
      )
      expect(sources.some(source => source.includes('datetime'))).toBe(false)
      expect(sources.some(source => source.endsWith('/DatePicker'))).toBe(
        false
      )
    }
  })
})
