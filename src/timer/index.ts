import useTimer from './useTimer'
import useStopwatch from './useStopwatch'
import useTime from './useTime'

export { useTimer, useStopwatch, useTime }

export enum TimeMilSecUnit {
  SECOND = 1000,
  MINUTE = 1000 * 60,
  HOUR = 1000 * 60 * 60,
  DAY = 1000 * 60 * 60 * 24,
}

export enum TimeSecUnit {
  SECOND = 1,
  MINUTE = 60,
  HOUR = 60 * 60,
  DAY = 60 * 60 * 24,
}

export enum TimeFormat {
  HOUR_12 = '12-hour',
  HOUR_24 = '24-hour',
}

export interface TimerSettings {
  autoStart?: boolean
  // expiryTimestamp: Date
  expiryTimestamp: number
  onExpire?: () => void
}

export interface TimerResult {
  totalSeconds: number
  seconds: number
  minutes: number
  hours: number
  days: number
  isRunning: boolean
  start: () => void
  pause: () => void
  resume: () => void
  restart: (newExpiryTimestamp: number, autoStart?: boolean) => void
}

export interface TimeSettings {
  format?: TimeFormat
}

export interface TimeResult {
  seconds: number
  minutes: number
  hours: number
  ampm: string
}

export interface StopwatchSettings {
  autoStart?: boolean
  offsetTimestamp?: number
}

export interface StopwatchResult {
  totalSeconds: number
  seconds: number
  minutes: number
  hours: number
  days: number
  isRunning: boolean
  start: () => void
  pause: () => void
  reset: (offsetTimestamp?: number, autoStart?: boolean) => void
}
