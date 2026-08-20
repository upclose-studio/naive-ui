import type { ScrollbarTheme } from '../../_internal/scrollbar/styles'
import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ButtonTheme } from '../../button/styles'
import type { InputTheme } from '../../input/styles'
import type { TimePickerTheme } from '../../time-picker/styles'
import type { DatePickerThemeVars } from './self'
import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { buttonLight } from '../../button/styles'
import { inputLight } from '../../input/styles'
import { timePickerLight } from '../../time-picker/styles'
import { self } from './self'

export { self } from './self'
export type { DatePickerThemeVars } from './self'

const datePickerLight: DatePickerTheme = createTheme({
  name: 'DatePicker',
  common: commonLight,
  peers: {
    Input: inputLight,
    Button: buttonLight,
    TimePicker: timePickerLight,
    Scrollbar: scrollbarLight
  },
  self
})

export interface DatePickerTheme extends Theme<
  'DatePicker',
  DatePickerThemeVars,
  {
    Input: InputTheme
    Button: ButtonTheme
    TimePicker: TimePickerTheme
    Scrollbar: ScrollbarTheme
  }
> {}

export interface DatePickerThemeOverrides extends ExtractThemeOverrides<DatePickerTheme> {}

export default datePickerLight
