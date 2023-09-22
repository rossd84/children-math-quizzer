import React from 'react';
import { useTimer } from '../context/TimerContext';

const TimerDisplay: React.FC = () => {
  const { seconds } = useTimer();

  // Calculate minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return (
    <div>
      <p className={remainingSeconds > 10 ? '': 'text-candyRed'}>
        {minutes}:{remainingSeconds < 10 ? '0' : ''}{remainingSeconds}
      </p>
    </div>
  );
};

export default TimerDisplay;
