import styled from '@emotion/styled'
import { Digit } from '@components'

const TimerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`

const SeparatorContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-end;
  margin: 0 0 10px 0;
`

const Separator = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #404549;
  border-radius: 6px;
  margin: 5px 0;
`

interface TimerStyledProps {
  seconds: number
  minutes: number
  hours: number
  days?: number
}

const TimerStyled = ({ seconds, minutes, hours, days }: TimerStyledProps) => {
  return (
    <TimerContainer>
      {days && <Digit value={days} title={'DAYS'} />}
      {days && (
        <SeparatorContainer>
          <Separator />
          <Separator />
        </SeparatorContainer>
      )}
      <Digit value={hours} title={'HOURS'} />
      <SeparatorContainer>
        <Separator />
        <Separator />
      </SeparatorContainer>
      <Digit value={minutes} title={'MINUTES'} />
      <SeparatorContainer>
        <Separator />
        <Separator />
      </SeparatorContainer>
      <Digit value={seconds} title="SECONDS" />
    </TimerContainer>
  )
}

export default TimerStyled
