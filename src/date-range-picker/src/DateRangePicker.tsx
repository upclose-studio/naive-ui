import { createDatePicker } from '../../date-picker/src/create-date-picker'
import DatePanel from '../../date-picker/src/panel/date'
import DaterangePanel from '../../date-picker/src/panel/daterange'
import { dateRangePickerLight } from '../../date-picker/styles/range-light'
import { dateRangePickerProps } from './props'

export type { DatePickerSlots as DateRangePickerSlots } from '../../date-picker/src/create-date-picker'

export default createDatePicker({
  name: 'DateRangePicker',
  theme: dateRangePickerLight,
  defaultType: 'daterange',
  allowedTypes: ['date', 'daterange'],
  props: dateRangePickerProps,
  panels: {
    date: DatePanel,
    daterange: DaterangePanel
  }
})
