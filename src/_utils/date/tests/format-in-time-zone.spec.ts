import { formatInTimeZone } from '../format-in-time-zone'

describe('formatInTimeZone', () => {
  // UTC 2022-06-05 18:09:28.216
  const utcMs = 1654452568216

  it('formats a timestamp in Asia/Shanghai', () => {
    expect(
      formatInTimeZone(utcMs, 'Asia/Shanghai', 'yyyy/MM/dd HH:mm:ss')
    ).toBe('2022/06/06 02:09:28')
  })

  it('formats a timestamp in America/New_York', () => {
    expect(
      formatInTimeZone(utcMs, 'America/New_York', 'yyyy/MM/dd HH:mm:ss')
    ).toBe('2022/06/05 14:09:28')
  })

  it('accepts Date instances', () => {
    expect(
      formatInTimeZone(new Date(utcMs), 'UTC', 'yyyy-MM-dd HH:mm:ss')
    ).toBe('2022-06-05 18:09:28')
  })
})
