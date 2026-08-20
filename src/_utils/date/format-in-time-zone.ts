import type { Locale } from 'date-fns'
import { tz } from '@date-fns/tz'
import { format } from 'date-fns'

export interface FormatInTimeZoneOptions {
  locale?: Locale
}

/**
 * date-fns v4 replacement for `date-fns-tz/formatInTimeZone`.
 * Uses `@date-fns/tz` via the `in` context option.
 */
export function formatInTimeZone(
  date: Date | number,
  timeZone: string,
  formatStr: string,
  options?: FormatInTimeZoneOptions
): string {
  return format(date, formatStr, {
    locale: options?.locale,
    in: tz(timeZone)
  })
}
