import type { PropType } from 'vue'
import { datePickerProps } from '../../date-picker/src/props'

export type DateRangePickerType = 'date' | 'daterange'

export const dateRangePickerProps = {
  ...datePickerProps,
  type: {
    type: String as PropType<DateRangePickerType>,
    default: 'daterange'
  }
} as const
