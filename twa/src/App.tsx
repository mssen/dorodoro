import React, { useState } from 'react';

import useInterval from './hooks/useInterval';

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [time, setTime] = useState(1500);

  useInterval(
    () => {
      setTime(prevTime => prevTime - 1);
    },
    isRunning ? 1000 : null
  );

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <main>
      {formatTime(time)}
      <button onClick={() => setIsRunning(prevIsRunning => !prevIsRunning)}>
        {isRunning ? 'Pause' : 'Unpause'}
      </button>
    </main>
  );
};

export default App;
