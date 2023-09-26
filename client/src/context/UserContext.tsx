// UserContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type UserAnswer = {
  num1: number;
  num2: number;
  answer: number;
  isCorrect: boolean;
  time: number;
};

type UserContextType = {
  userAnswerList: UserAnswer[];
  addAnswer: (userData: UserAnswer) => void;
  clearUserAnswerList: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [userAnswerList, setUserAnswerList] = useState<UserAnswer[]>([]);

  const addAnswer = (userData: UserAnswer) => {
    setUserAnswerList([...userAnswerList, userData]);
  };

  const clearUserAnswerList = () => {
    setUserAnswerList([])
  }

  const contextValue: UserContextType = {
    userAnswerList,
    addAnswer,
    clearUserAnswerList
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}
