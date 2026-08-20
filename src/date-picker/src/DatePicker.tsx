import { datePickerLight } from '../styles'
import { createDatePicker } from './create-date-picker'
import DatePanel from './panel/date'
import DaterangePanel from './panel/daterange'
import DatetimePanel from './panel/datetime'
import DatetimerangePanel from './panel/datetimerange'
import MonthPanel from './panel/month'
import MonthRangePanel from './panel/monthrange'

export type {
  DatePickerSetupProps,
  DatePickerSlots
} from './create-date-picker'

export default createDatePicker({
  name: 'DatePicker',
  theme: datePickerLight,
  defaultType: 'date',
  panels: {
    date: DatePanel,
    datetime: DatetimePanel,
    daterange: DaterangePanel,
    datetimerange: DatetimerangePanel,
    month: MonthPanel,
    year: MonthPanel,
    quarter: MonthPanel,
    monthrange: MonthRangePanel,
    yearrange: MonthRangePanel,
    quarterrange: MonthRangePanel,
    week: DatePanel
  }
})
