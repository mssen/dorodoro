import React, { useReducer } from 'react';

import { reducer, initialState, actions } from './timerReducer';
import useInterval from './hooks/useInterval';

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
    <main>
      {formatTime(state.time)}
      <button onClick={reset}>Reset</button>
      <button onClick={togglePause}>
        {state.isPauseed ? 'Unpause' : 'Pause'}
      </button>
      <button onClick={skip}>Skip</button>
    </main>
  );
};

export default App;
