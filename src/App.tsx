import styled from '@emotion/styled'
import { Global, css } from '@emotion/react'
import { UseTimerDemo, UseTimeDemo, UseStopwatchDemo } from '@components'
import { TimeMilSecUnit } from '@timer'

const GlobalStyle = css`
  html,
  body {
    margin: 0;
    font-family: Arial;
    text-align: left;
    color: #404549;
  }
  h2 {
    margin-top: 20px;
  }
`

const HeaderBG = styled.div`
  background-color: #404549;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & h1 {
    margin: 20px 0;
  }
`

const H1 = styled.h1`
  color: white;
`

const Separator = styled.div`
  height: 0;
  margin-top: 30px;
  border: dashed 2px #404549;
`

const Container = styled.div`
  width: 1170px;
  margin-left: auto;
  margin-right: auto;
`

const App = () => {
  let time = Date.now()
  time = time + TimeMilSecUnit.MINUTE * 10

  return (
    <>
      <Global styles={GlobalStyle} />
      <HeaderBG>
        <Container>
          <Header>
            <H1>react-timer-hook</H1>
            <div>
              <iframe
                src="https://ghbtns.com/github-btn.html?user=amrlabib&repo=react-timer-hook&type=star&count=true&size=large"
                frameBorder="0"
                scrolling="0"
                width="160"
                height="30"
                title="GitHub"
              />
              <iframe
                src="https://ghbtns.com/github-btn.html?user=amrlabib&repo=react-timer-hook&type=fork&count=true&size=large"
                frameBorder="0"
                scrolling="0"
                width="126"
                height="30"
                title="GitHub"
              />
            </div>
          </Header>
        </Container>
      </HeaderBG>
      <Container>
        <p>
          React timer hook is a custom{' '}
          <a href="https://reactjs.org/docs/hooks-intro.html" target="_blank">
            react hook
          </a>{' '}
          built to handle timer, stopwatch, and time logic/state in your react component.
        </p>
        <UseTimerDemo expiryTimestamp={time} />
        <Separator />
        <UseStopwatchDemo />
        <Separator />
        <UseTimeDemo />
      </Container>
    </>
  )
}

export default App
