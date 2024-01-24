import { useTime } from '@timer'
import styled from '@emotion/styled'
import { TimerStyled } from '@components'

const Container = styled.div``
const Title = styled.h4``

const UseTimeDemo = () => {
  const { seconds, minutes, hours } = useTime({})

  // const now = new Date()
  // console.log('compare Time', `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`)
  // console.log(`${hours}:${minutes}:${seconds}`)

  return (
    <Container>
      <Title>UseTime Demo</Title>
      <Container>
        <TimerStyled seconds={seconds} minutes={minutes} hours={hours} />
      </Container>
    </Container>
  )
}

export default UseTimeDemo
