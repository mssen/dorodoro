import React from 'react';
import styled from 'styled-components';

import useTimer from './timerReducer';
import useInterval from './hooks/useInterval';

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #d50a16ed;
`;

const TimerContainer = styled.article`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const TimerText = styled.span`
  color: #fff;
  font-size: 4em;
  font-weight: bold;
  text-shadow: 3px 2px 3px hsla(0, 0%, 0%, 0.4);
`;

const ButtonContainer = styled.section`
  margin-top: 2em;
`;

const App: React.FC = () => {
  const timer = useTimer();

  useInterval(
    () => {
      timer.actions.tick();
    },
    timer.state.isPauseed ? null : 1000
  );

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Main>
      <TimerContainer>
        <TimerText>{formatTime(timer.state.time)}</TimerText>
        <ButtonContainer>
          <button onClick={timer.actions.reset}>Reset</button>
          <button onClick={timer.actions.togglePause}>
            {timer.state.isPauseed ? 'Unpause' : 'Pause'}
          </button>
          <button onClick={timer.actions.next}>Skip</button>
        </ButtonContainer>
      </TimerContainer>
    </Main>
  );
};

export default App;
