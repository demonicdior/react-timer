import { Button, TimerStyled } from '@components'
import styled from '@emotion/styled'
import { useStopwatch } from '@timer'

const Container = styled.div``
const Title = styled.h4``

const UseStopwatchDemo = () => {
  const { seconds, minutes, hours, days, start, pause, reset } = useStopwatch({ autoStart: true })

  return (
    <Container>
      <Title>UseStopwatch Demo</Title>
      <TimerStyled seconds={seconds} minutes={minutes} hours={hours} days={days} />
      <Button label={'start'} onClick={() => start()} />
      <Button label={'pause'} onClick={() => pause()} />
      <Button label={'reset'} onClick={() => reset()} />
    </Container>
  )
}

export default UseStopwatchDemo
