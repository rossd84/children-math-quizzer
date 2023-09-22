import { createContext, useState, useContext, ReactNode } from 'react';
import { UserAnswer } from '../App';

interface ChildrenProps {
  children: ReactNode;
}

interface UserContextType {
  userAnswers: UserAnswer[];
  setUserAnswers: React.Dispatch<React.SetStateAction<never[]>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserContextProvider({children}: ChildrenProps) {
  const [userAnswers, setUserAnswers] = useState([]);

  return (
    <UserContext.Provider
      value={{
        userAnswers,
        setUserAnswers
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};