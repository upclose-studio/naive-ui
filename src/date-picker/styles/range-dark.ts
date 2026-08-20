import type { DateRangePickerTheme } from './range-light'
import { changeColor, composite } from 'seemly'
import { scrollbarDark } from '../../_internal/scrollbar/styles'
import { commonDark } from '../../_styles/common'
import { buttonDark } from '../../button/styles'
import { inputDark } from '../../input/styles'
import { self } from './self'

const dateRangePickerDark: DateRangePickerTheme = {
  name: 'DatePicker',
  common: commonDark,
  peers: {
    Input: inputDark,
    Button: buttonDark,
    Scrollbar: scrollbarDark
  },
  self(vars) {
    const { popoverColor, hoverColor, primaryColor } = vars
    const commonSelf = self(vars)
    commonSelf.itemColorDisabled = composite(popoverColor, hoverColor)
    commonSelf.itemColorIncluded = changeColor(primaryColor, { alpha: 0.15 })
    commonSelf.itemColorHover = composite(popoverColor, hoverColor)
    return commonSelf
  }
}

export default dateRangePickerDark
