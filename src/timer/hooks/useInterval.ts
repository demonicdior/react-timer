import { useEffect, useRef } from 'react'

/**
 * 주어진 콜백 함수를 주어진 시간 간격으로 실행하는 커스텀 훅
 *
 * @param callback - 주기적으로 실행하고자 하는 콜백 함수
 * @param delay    - 콜백 함수를 실행하고자 하는 주기(밀리초 단위)
 */
const useInterval = (callback: () => any, delay: number | null) => {
  const callbackRef = useRef<() => any>()

  // 콜백 함수를 useRef 훅에 설정하여, useEffect 내에서 최신의 함수를 참조
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // delay 변경 시 마다 interval 실행/정지를 제어
  useEffect(() => {
    if (!delay) return () => {}

    // 설정한 delay 간격마다 콜백 함수를 실행
    const interval = setInterval(() => {
      callbackRef.current && callbackRef.current()
    }, delay)

    // 컴포넌트 unmount 시에 혹은 delay가 변경될 때 interval을 정지합니다.
    return () => clearInterval(interval)
  }, [delay])
}

export default useInterval
