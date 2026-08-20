import type { Value } from '../../date-picker/src/interface'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { NDateRangePicker } from '../index'

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
})
