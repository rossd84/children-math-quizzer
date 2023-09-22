import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Create a context for the timer
interface TimerContextType {
  seconds: number;
  isRunning: boolean;
  isStarted: boolean;
  isComplete: boolean;
  setIsComplete: (value: boolean) => void;
  setSeconds: (value: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: (initialSeconds?: number) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

// Create a TimerProvider component
interface TimerProviderProps {
  children: ReactNode;
  initialSeconds?: number; // Allow initial seconds as a prop
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [seconds, setSeconds] = useState<number>(120);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

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

  const startTimer = () => {
    setIsStarted(true);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsStarted(false);
    setIsComplete(false);
    setSeconds(120);
  };

  return (
    <TimerContext.Provider value={{ seconds, setSeconds, isRunning, isStarted, isComplete, setIsComplete, startTimer, pauseTimer, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

// Create a custom hook to access the timer context
export const useTimer = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
