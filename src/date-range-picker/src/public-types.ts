import type { ExtractPublicPropTypes } from '../../_utils'
import type { DatePickerInst } from '../../date-picker/src/public-types'
import type { dateRangePickerProps } from './props'

export type DateRangePickerInst = DatePickerInst

export type DateRangePickerProps = ExtractPublicPropTypes<
  typeof dateRangePickerProps
>
