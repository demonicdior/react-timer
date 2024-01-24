import styled from '@emotion/styled'
import { useMemo } from 'react'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;

  &:first-of-type {
    margin-left: 0;
  }
`

const Title = styled.span`
  font-size: 12px;
  margin-bottom: 5px;
`

const DigitContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
`

const SingleDigit = styled.span`
  position: relative;
  display: flex;
  flex: 0 1 25%;
  font-size: 30px;
  background-color: #404549;
  border-radius: 5px;
  padding: 10px 12px;
  color: white;

  &:first-of-type {
    margin-right: 2px;
  }

  &:after {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    bottom: 50%;
    content: '';
    width: 100%;
    height: 2px;
    background-color: #232323;
    opacity: 0.4;
  }
`

interface DigitProps {
  value: number
  title: string
}

const Digit = ({ value, title }: DigitProps) => {
  // const leftDigit = value >= 10 ? value.toString()[0] : ''
  // const rightDigit = value >= 10 ? value.toString()[1] : value.toString()

  // const [leftDigit, rightDigit] = value.toString().padStart(2, '0').split('')
  const [leftDigit, rightDigit] = useMemo(() => {
    const digit = value.toString().padStart(2, '0').split('')
    return digit
  }, [value])

  return (
    <Container>
      <Title>{title}</Title>
      <DigitContainer>
        <SingleDigit>{leftDigit}</SingleDigit>
        <SingleDigit>{rightDigit}</SingleDigit>
      </DigitContainer>
    </Container>
  )
}

export default Digit
