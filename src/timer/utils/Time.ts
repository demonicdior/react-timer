import { TimeFormat, TimeMilSecUnit, TimeSecUnit } from '@timer'

/**
 * Time 객체는 시간 계산과 포맷팅에 관련된 다양한 유틸리티 함수를 제공
 * @namespace
 */
const Time = {
  /**
   * 주어진 숫자를 초 단위로 받아 이를 관련 시간 단위로 변환합니다.
   * 변환된 결과는 일, 시, 분, 초로 이루어진 객체로 반환됩니다.
   *
   * @param {number} secs - 변환을 원하는 시간(초 단위).
   * @return {{ totalSeconds: number; seconds: number; minutes: number; hours: number; days: number }} - 변환된 결과를 담은 객체.
   */
  getTimeFromSeconds: (
    secs: number
  ): { totalSeconds: number; seconds: number; minutes: number; hours: number; days: number } => {
    const totalSeconds = Math.ceil(secs)
    const days = Math.floor(totalSeconds / TimeSecUnit.DAY)
    const hours = Math.floor((totalSeconds % TimeSecUnit.DAY) / TimeSecUnit.HOUR)
    const minutes = Math.floor((totalSeconds % TimeSecUnit.HOUR) / TimeSecUnit.MINUTE)
    const seconds = Math.floor(totalSeconds % TimeSecUnit.MINUTE)

    return {
      totalSeconds,
      seconds,
      minutes,
      hours,
      days,
    }
  },

  /**
   * 주어진 만료 타임스탬프에서 남은 초를 반환
   *
   * @param {number} expiry - 만료 타임스탬프
   * @param {boolean} shouldRound - 결과를 가장 가까운 정수로 반올림해야 하는지 여부를 나타내는 플래그
   * @returns {number} 만료 타임스탬프에서 남은 초
   */
  getSecondsFromExpiry: (expiry: number, shouldRound?: boolean): number => {
    const milliSecondsDistance = expiry - Date.now()

    // 만료 시간이 지나지 않은 경우에만 계산을 진행
    if (milliSecondsDistance > 0) {
      const seconds = milliSecondsDistance / TimeMilSecUnit.SECOND
      return shouldRound ? Math.round(seconds) : seconds
    }

    // 만료시간이 이미 지나면 0을 반환
    return 0
  },

  /**
   * 이전 시간에서 현재까지의 초를 계산하여 반환
   * 이미 지난 시간에 대해서는 0을 반환
   *
   * @param prevTime 이전 시간을 나타내는 밀리초 값
   * @param shouldRound 반환값을 반올림할지 여부
   * @returns {number} 이전 시간부터 현재까지의 초
   */
  getSecondsFromPrevTime(prevTime: number, shouldRound?: boolean): number {
    const milliSecondsDistance = Date.now() - prevTime
    const isPastTime = milliSecondsDistance > 0

    if (isPastTime) {
      const seconds = milliSecondsDistance / TimeMilSecUnit.SECOND
      return shouldRound ? Math.round(seconds) : seconds
    }

    // 이전 시간이 이미 지났다면 0 반환
    return 0
  },

  /**
   *  현재 시각까지의 타임스탬프를 초 단위로 반환
   *  타임스탬프는 1970년 1월 1일 00:00:00 UTC에서 현재 시각까지의 차이를 밀리초 단위로 표현한 값
   *  @returns {number} - 현재 시각의 타임스탬프 (초 단위)
   */
  getSecondsFromNow(): number {
    const now = new Date()
    const currentTimestamp = now.getTime()

    // getTimezoneOffset return 값은 보통 Minute 단위(국가별로 섬머타임을 신시하는 경우가 있어 정확치 않음)
    const timezoneOffsetInSeconds = now.getTimezoneOffset() * 60 * 1000
    return (currentTimestamp - timezoneOffsetInSeconds) / 1000
  },

  /**
   * 주어진 초를 받아 형식화된 시간을 반환
   *
   * @param {number} totalSeconds - 변환하려는 전체 초
   * @param {TimeFormat} format - 사용하려는 시간 형식 ('12-hour' 혹은 '24-hour')
   * @returns {{ seconds: number, minutes: number, hours: number, ampm: '' | 'am' | 'pm' }} - 변환된 시간 정보를 담은 객체
   */
  getFormattedTimeFromSeconds(
    totalSeconds: number,
    format: TimeFormat
  ): { seconds: number; hours: number; ampm: string; minutes: number } {
    const { seconds, minutes, hours } = Time.getTimeFromSeconds(totalSeconds)
    let ampm = ''
    let formattedHours = hours

    if (format === TimeFormat.HOUR_12) {
      ampm = hours >= 12 ? 'pm' : 'am'
      // 또한, 12시간제에서 0시는 실제로 12시로 표시되는데, 이를 처리하기 위해 hours = hours % 12 || 12; 구문을 사용했습니다. 여기서 || 12 부분은 JavaScript에서 0값을 falsy값으로 처리하므로 시간이 0시(24시)일 때, 12로 바꿔줍니다.
      formattedHours = hours % 12 || 12
    }

    return {
      seconds,
      minutes,
      hours: formattedHours,
      ampm,
    }
  },
}

export default Time
