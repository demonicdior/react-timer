import { useState, useCallback } from 'react'
import { Time } from './utils'
import { useInterval } from './hooks'
import { StopwatchSettings, TimeMilSecUnit } from '@timer'

/**
 * 주어진 설정에 따른 스톱워치를 제공하는 hook
 *
 * @param {StopwatchSettings} { autoStart, offsetTimestamp } - 스톱워치가 자동 시작하는지와 시간이 얼마나 지났는지를 나타내는 설정 객체
 * @returns 스톱워치의 현재 시간, 제어 함수들(start, pause, reset), 그리고 작동 상태(isRunning)가 포함된 객체를 반환
 */
const useStopwatch = ({ autoStart, offsetTimestamp }: StopwatchSettings) => {
  // 현재까지 경과된 시간을 초 단위로 저장.
  // 초기값은 외부에서 제공된 offsetTimestamp 가 주어지면 해당 값을 사용하고, 그렇지 않으면 0으로 설정
  const [passedSeconds, setPassedSeconds] = useState(
    offsetTimestamp ? Time.getSecondsFromExpiry(offsetTimestamp, true) : 0
  )
  // 스톱워치가 시작된 마지막 시각을 저장. 초기값은 현재 시각
  const [prevTime, setPrevTime] = useState(Date.now())
  // 스톱워치가 시작된 이후로 지난 총 시간을 초 단위로 저장
  const [seconds, setSeconds] = useState(Time.getSecondsFromPrevTime(prevTime || 0, true))
  // 스톱워치의 작동 상태를 저장. 초기값은 외부에서 제공하는 autoStart 값이 들어갈 것입니다.
  const [isRunning, setIsRunning] = useState(autoStart)

  /**
   * 스톱워치가 동작 중이면 각 초마다 잔여 시간을 업데이트한다.
   */
  useInterval(
    () => {
      const elapsedTimeInSeconds = Time.getSecondsFromPrevTime(prevTime, true)
      setSeconds(passedSeconds + elapsedTimeInSeconds)
    },
    isRunning ? TimeMilSecUnit.SECOND : null
  )

  /**
   * 스톱워치를 시작
   * 이전 시간을 현재 시간으로 설정하고, 스톱워치를 작동 상태로 변경
   * 마지막으로, 새로운 경과 시간을 계산하여 설정
   */
  const start = useCallback(() => {
    const newPrevTime = Date.now() // 현재 시간을 새로운 이전 시간으로 설정
    setPrevTime(newPrevTime)
    setIsRunning(true) // 스톱워치를 작동 상태로 설정
    const elapsedTimeInSeconds = Time.getSecondsFromPrevTime(newPrevTime, true)
    setSeconds(passedSeconds + elapsedTimeInSeconds) // 새로운 총 경과 시간을 설정
  }, [passedSeconds])

  /**
   * 스톱워치를 일시정지
   * 현재까지 경과한 시간을 저장하고, 스톱워치의 상태를 일시정지 상태로 설정
   */
  const pause = useCallback(() => {
    setPassedSeconds(seconds) // 경과한 시간을 저장
    setIsRunning(false) // 스톱워치를 일시정지 상태로 설정
  }, [seconds])

  /**
   * 스톱워치를 리셋
   *
   * @param {number} offset - 리셋 시점부터 경과된 시간(밀리초 단위). 기본값은 0
   * @param {boolean} newAutoStart - 스톱워치가 리셋 후에 자동으로 작동되는지의 여부. 기본값은 true
   */
  const reset = useCallback((offset = 0, newAutoStart = true) => {
    // 경과된 시간을 계산
    const newPassedSeconds = Time.getSecondsFromExpiry(offset, true) || 0

    // 현재 시간
    const newPrevTime = Date.now()

    // 경과된 시간과 이전 시간을 갱신합니다.
    setPassedSeconds(newPassedSeconds)
    setPrevTime(newPrevTime)

    // 전체 경과 시간(새로 경과된 시간 + 이전 시간으로부터 지난 시간)을 계산하고 설정
    const totalPassedSeconds = newPassedSeconds + Time.getSecondsFromPrevTime(newPrevTime, true)
    setSeconds(totalPassedSeconds)

    // 스톱워치의 상태를 갱신합니다.
    setIsRunning(newAutoStart)
  }, [])

  return {
    ...Time.getTimeFromSeconds(seconds),
    start,
    pause,
    reset,
    isRunning,
  }
}

export default useStopwatch
