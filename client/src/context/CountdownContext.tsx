import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Create a context for the countdown
interface CountdownContextType {
  seconds: number;
  isRunning: boolean;
  isStarted: boolean;
  isComplete: boolean;
  setIsComplete: (value: boolean) => void;
  setSeconds: (value: number) => void;
  startCountdown: () => void;
  pauseCountdown: () => void;
  resetCountdown: (initialSeconds?: number) => void;
}

const CountdownContext = createContext<CountdownContextType | undefined>(undefined);

// Create a CountdownProvider component
interface CountdownProviderProps {
  children: ReactNode;
  initialSeconds?: number; // Allow initial seconds as a prop
}

export const CountdownProvider: React.FC<CountdownProviderProps> = ({ children }) => {
  const [seconds, setSeconds] = useState<number>(120);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          console.log('Finished');
          setIsRunning(false);
          setIsComplete(true);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const startCountdown = () => {
    setIsStarted(true);
    setIsRunning(true);
  };

  const pauseCountdown = () => {
    setIsRunning(false);
  };

  const resetCountdown = () => {
    setIsRunning(false);
    setIsStarted(false);
    setIsComplete(false);
    setSeconds(120);
  };

  return (
    <CountdownContext.Provider value={{ seconds, setSeconds, isRunning, isStarted, isComplete, setIsComplete, startCountdown, pauseCountdown, resetCountdown }}>
      {children}
    </CountdownContext.Provider>
  );
};

// Create a custom hook to access the countdown context
export const useCountdown = (): CountdownContextType => {
  const context = useContext(CountdownContext);
  if (context === undefined) {
    throw new Error('useCountdown must be used within a CountdownProvider');
  }
  return context;
};
