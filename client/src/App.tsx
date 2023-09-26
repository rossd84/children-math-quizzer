import { UserProvider } from "./context/UserContext";
import { TimerProvider } from "./context/TimerContext";
import { Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz"
import Home from "./pages/Home";
import Results from "./pages/Results";
import { SettingsProvider } from "./context/SettingsContext";

export interface UserAnswer {
  num1: number;
  num2: number;
  isCorrect: boolean;
}

function App() {

  
  return (
    <UserProvider>
      <SettingsProvider>
        <TimerProvider initialSeconds={2}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </TimerProvider>
      </SettingsProvider>
    </UserProvider>
)
}

export default App
