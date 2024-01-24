import { useState } from 'react'
import { Time } from './utils'
import { useInterval } from './hooks'
import { TimeFormat, TimeMilSecUnit, TimeResult, TimeSettings } from '@timer'

/**
 * 주어진 시간 형식에 따른 타이머를 제공하는 hook
 *
 * @param {TimeSettings} param - 시간 형식을 지정하는 설정 객체
 * @returns {TimeResult} - 계산된 시간 정보들을 담고 있는 객체
 */
const useTime = ({ format }: TimeSettings): TimeResult => {
  const [seconds, setSeconds] = useState(Time.getSecondsFromNow())

  // 매 초마다 현재 시간을 업데이트
  useInterval(() => {
    const currentSeconds = Time.getSecondsFromNow()
    setSeconds(currentSeconds)
  }, TimeMilSecUnit.SECOND)

  // 현재 시간의 정보를 형식화된 형태로 반환
  // 만일 형식이 주어지지 않았다면, 기본으로 24시간 형식(HOUR_24)을 사용
  return {
    ...Time.getFormattedTimeFromSeconds(seconds, format ? format : TimeFormat.HOUR_24),
  }
}

export default useTime
