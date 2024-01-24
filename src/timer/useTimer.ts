import { useState, useCallback } from 'react'
import { Time, Validate } from './utils'
import { useInterval } from './hooks'
import { TimeMilSecUnit, TimerResult, TimerSettings } from '@timer'

/**
 * 주어진 만료 타임스탬프를 기반으로 딜레이(지연) 시간을 밀리초 단위로 계산
 * 계산된 딜레이가 0일 경우, 기본 딜레이를 반환
 *
 * @param {number} expiryTimestamp - 만료 타임스탬프(밀리초 단위)
 * @returns {number | null} - 계산된 딜레이 시간 (밀리초 단위), 또는 검증에 실패할 경우 null
 */
const getDelayFromExpiryTimestamp = (expiryTimestamp: number): number | null => {
  // 타임스탬프 검증
  if (!Validate.expiryTimestamp(expiryTimestamp)) return null

  // 만료 까지 남은 시간(초)
  const secondsUntilExpiry = Time.getSecondsFromExpiry(expiryTimestamp)

  // 초 단위의 값에서 소수점 아래 부분만 추출하여 밀리초로 변환
  const extraMilliSeconds = Math.floor((secondsUntilExpiry - Math.floor(secondsUntilExpiry)) * TimeMilSecUnit.SECOND)

  // 만약 계산된 딜레이가 0 초라면, 기본 딜레이를 사용
  return extraMilliSeconds > 0 ? extraMilliSeconds : TimeMilSecUnit.SECOND
}

/**
 * Timer Hook
 */
const useTimer = ({ expiryTimestamp: expiry, onExpire, autoStart = true }: TimerSettings): TimerResult => {
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry)
  const [seconds, setSeconds] = useState(Time.getSecondsFromExpiry(expiryTimestamp))
  const [isRunning, setIsRunning] = useState(autoStart)
  const [didStart, setDidStart] = useState(autoStart)
  const [delay, setDelay] = useState(getDelayFromExpiryTimestamp(expiryTimestamp))

  /**
   * 타이머의 만료를 처리
   * 만료 콜백이 설정되어 있으면 실행하고, 타이머를 중지
   */
  const handleExpire = useCallback(() => {
    // 만료 콜백이 유효한 경우에만 실행
    if (Validate.onExpire(onExpire)) {
      onExpire?.()
    }

    // 타이머를 중지하고 딜레이를 초기화
    setIsRunning(false)
    setDelay(null)
  }, [onExpire])

  /**
   * 타이머를 일시 정지
   */
  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  /**
   * 새로운 만료 시간을 받아 타이머를 재시작
   *
   * @param {number} newExpiryTimestamp - 새로운 타이머 만료 시간(타임스탬프)
   * @param {boolean} newAutoStart - 타이머를 자동으로 시작할 지 여부(기본값은 true)
   */
  const restart = useCallback((newExpiryTimestamp: number, newAutoStart = true) => {
    // 만료 시간을 기반으로 새로운 딜레이를 계산하고 설정
    setDelay(getDelayFromExpiryTimestamp(newExpiryTimestamp))

    // 타이머의 시작 상태를 결정
    setDidStart(newAutoStart)

    // 타이머의 실행 상태를 결정
    setIsRunning(newAutoStart)

    // 새 만료 타임스탬프를 설정
    setExpiryTimestamp(newExpiryTimestamp)

    // 만료 시간까지 남은 시간을 초 단위로 계산하고 설정
    setSeconds(Time.getSecondsFromExpiry(newExpiryTimestamp))
  }, [])

  /**
   * 타이머를 재개하는 함수입니다.
   * 현재 시간과 남은 초를 계산하여 새로운 타임스탬프를 생성하고, 이를 기반으로 타이머를 재시작합니다.
   */
  const resume = useCallback(() => {
    const time = new Date()
    time.setMilliseconds(time.getMilliseconds() + seconds * TimeMilSecUnit.SECOND)

    // TODO: Date 타입 주입을 timestamp로 변환처리 하였는데 이에 대한 검증 필요
    const timestamp = time.getTime()

    restart(timestamp)
  }, [seconds, restart])

  /**
   * 타이머를 시작
   * 만약 타이머가 이미 시작되었다면, 남은 시간을 계산하여 재시작
   * 아니라면, 타이머를 재개(resume)
   */
  const start = useCallback(() => {
    if (didStart) {
      // 타이머가 이미 시작되었다면, 남은 시간을 다시 계산하고 타이머을 실행
      setSeconds(Time.getSecondsFromExpiry(expiryTimestamp))
      setIsRunning(true)
    } else {
      // 아직 타이머가 시작되지 않았다면, 타이머를 재개
      resume()
    }
  }, [expiryTimestamp, didStart, resume])

  /**
   * 주어진 시간 간격으로 남은 시간이 없다면 만료 처리
   */
  useInterval(
    () => {
      // 만약 딜레이가 기본 딜레이 값이 아니라면, 딜레이 값을 기본 딜레이로 설정합니다.
      if (delay !== TimeMilSecUnit.SECOND) {
        setDelay(TimeMilSecUnit.SECOND)
      }

      // 만료 시간까지 남은 시간을 초 단위로 계산
      const remainingSeconds = Time.getSecondsFromExpiry(expiryTimestamp)
      setSeconds(remainingSeconds)

      // 만약 남은 시간이 없다면, 만료 처리 함수를 호출
      if (remainingSeconds <= 0) {
        handleExpire()
      }
    },
    // 타이머가 실행 중이라면 딜레이 값을 설정하고, 그렇지 않다면 null을 설정
    isRunning ? delay : null
  )

  return {
    ...Time.getTimeFromSeconds(seconds),
    start,
    pause,
    resume,
    restart,
    isRunning,
  }
}

export default useTimer
