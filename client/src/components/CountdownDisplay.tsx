import React from 'react';
import { useCountdown} from '../context/CountdownContext';

const CountdownDisplay: React.FC = () => {
  const { seconds } = useCountdown();

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

export default CountdownDisplay;
