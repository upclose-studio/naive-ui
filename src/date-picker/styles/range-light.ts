import type { ScrollbarTheme } from '../../_internal/scrollbar/styles'
import type { Theme } from '../../_mixins'
import type { ButtonTheme } from '../../button/styles'
import type { InputTheme } from '../../input/styles'
import type { DatePickerThemeVars } from './self'
import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { buttonLight } from '../../button/styles'
import { inputLight } from '../../input/styles'
import { self } from './self'

export interface DateRangePickerTheme extends Theme<
  'DatePicker',
  DatePickerThemeVars,
  {
    Input: InputTheme
    Button: ButtonTheme
    Scrollbar: ScrollbarTheme
  }
> {}

export const dateRangePickerLight: DateRangePickerTheme = createTheme({
  name: 'DatePicker',
  common: commonLight,
  peers: {
    Input: inputLight,
    Button: buttonLight,
    Scrollbar: scrollbarLight
  },
  self
})

export default dateRangePickerLight
