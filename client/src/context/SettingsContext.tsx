// SettingsContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type SettingsContextType = {
  numberOfQuestions: number;
  setNumberOfQuestions: (number: number) => void;
  selectedNumbers: number[];
  toggleNumberSelection: (number: number) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

type SettingsProviderProps = {
  children: ReactNode;
};

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [numberOfQuestions, setNumberOfQuestions] = useState(25)
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const toggleNumberSelection = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  useEffect(() => {
    // Set the initial selected numbers here
    setSelectedNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); // Replace with your desired default numbers
  }, []);

  const contextValue: SettingsContextType = {
    numberOfQuestions,
    setNumberOfQuestions,
    selectedNumbers,
    toggleNumberSelection,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}
