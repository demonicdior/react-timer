const Validate = {
  /**
   * 주어진 타임스탬프가 유효한지 검사
   * 유효하지 않은 경우 경고 메시지를 콘솔에 출력
   *
   * @param {number} expiryTimestamp - 검사하려는 타임스탬프 값
   * @returns {boolean} - 타임스탬프 값이 유효하면 true, 그렇지 않으면 false
   */
  expiryTimestamp(expiryTimestamp: number): boolean {
    const timeStamp = new Date(expiryTimestamp).getTime()
    const isValid = timeStamp > 0
    if (!isValid) console.warn(`react-timer: { useTimer } Invalid expiryTimestamp settings ${expiryTimestamp}`)
    return isValid
  },

  /**
   * onExpire 함수가 유효한 함수인지를 판별
   * 유효하지 않은 경우, 콘솔에 경고를 출력
   *
   * @param {() => any} onExpire - 검증할 함수
   * @returns {boolean} - 검증을 통과하면 true, 그렇지 않으면 false
   */
  onExpire(onExpire?: () => any): boolean {
    const isValid = (onExpire && typeof onExpire === 'function') || false
    if (!isValid) console.warn(`react-timer-hook: { useTimer } Invalid onExpire function`, onExpire)
    return isValid
  },
}

export default Validate
