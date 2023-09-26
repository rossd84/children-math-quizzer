import { UserProvider } from "./context/UserContext";
import { CountdownProvider } from "./context/CountdownContext";
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
        <CountdownProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </CountdownProvider>
      </SettingsProvider>
    </UserProvider>
)
}

export default App
