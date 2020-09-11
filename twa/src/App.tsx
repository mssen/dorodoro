import React, { useReducer } from 'react';
import styled from 'styled-components';

import { reducer, initialState, actions } from './timerReducer';
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
  const [state, dispatch] = useReducer(reducer, initialState);

  useInterval(
    () => {
      dispatch(actions.tick());
    },
    state.isPauseed ? null : 1000
  );

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const reset = () => dispatch(actions.reset());
  const togglePause = () => dispatch(actions.togglePause());
  const skip = () => dispatch(actions.next());

  return (
    <Main>
      <TimerContainer>
        <TimerText>{formatTime(state.time)}</TimerText>
        <ButtonContainer>
          <button onClick={reset}>Reset</button>
          <button onClick={togglePause}>
            {state.isPauseed ? 'Unpause' : 'Pause'}
          </button>
          <button onClick={skip}>Skip</button>
        </ButtonContainer>
      </TimerContainer>
    </Main>
  );
};

export default App;
