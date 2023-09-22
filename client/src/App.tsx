import UserContextProvider from "./context/UserContext";
import { TimerProvider } from "./context/TimerContext";
import Quiz from "./pages/Quiz"

export interface UserAnswer {
  num1: number;
  num2: number;
  isCorrect: boolean;
}

function App() {

  
  return (
    <UserContextProvider>
      <TimerProvider initialSeconds={2}>
        <div>
          <Quiz />
        </div>
      </TimerProvider>
    </UserContextProvider>
)
}

export default App
