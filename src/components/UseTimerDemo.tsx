import { TimeMilSecUnit, useTimer } from '@timer'
import styled from '@emotion/styled'
import { TimerStyled, Button } from '@components'

const Container = styled.div``
const Title = styled.h4``

interface UseTimerDemoProps {
  expiryTimestamp: number
}

const UseTimerDemo = ({ expiryTimestamp }: UseTimerDemoProps) => {
  const { seconds, minutes, hours, days, start, pause, resume, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn('onExpire called'),
  })

  return (
    <Container>
      <Title>UseTimer Demo</Title>
      <TimerStyled seconds={seconds} minutes={minutes} hours={hours} days={days} />
      <Button label={'Start'} onClick={start} />
      <Button label={'Pause'} onClick={pause} />
      <Button label={'Resume'} onClick={resume} />
      <Button
        label={'Restart'}
        onClick={() => {
          const time = Date.now() + TimeMilSecUnit.MINUTE * 10
          restart(time)
        }}
      />
    </Container>
  )
}

export default UseTimerDemo
