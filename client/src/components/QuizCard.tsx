import { 
  useState,
  useRef,
  useContext,
  ChangeEvent, 
  KeyboardEvent,
  useEffect, 
} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
// import Timer from './Timer'
import TimerDisplay from './Timer'
import { useTimer } from '../context/TimerContext'


const QuizCard = ({totalCards}) => {
  // state
  const [minNumber, setMinNumber] = useState<number>(0)
  const [maxNumber, setMaxNumber] = useState<number>(12)
  const [number1, setNumber1] = useState<number>(0)
  const [number2, setNumber2] = useState<number>(0)
  const [inputValue, setInputValue] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  //context
  const {userAnswers, setUserAnswers} = useContext(UserContext)
  const {startTimer, setIsComplete, isComplete } = useTimer();
  // references
  const inputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    createNumbers();
    startTimer();

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if(userAnswers.length >= totalCards || isComplete) {
      setIsComplete(true)
      console.log('complete')
      navigate("/results");
    }
  }, [userAnswers, isComplete])

  // calculate new equation
  const createNumbers = () => {
    setNumber1(Math.floor(Math.random() * (maxNumber - minNumber) + minNumber))
    setNumber2(Math.floor(Math.random() * (maxNumber - minNumber) + minNumber))
  }

  // evaluate answer
  const checkAnswer = () => {
    const checkIsCorrect = parseInt(inputValue) === number1 * number2
    setIsCorrect(checkIsCorrect);

    setUserAnswers([...userAnswers, {
      num1: number1,
      num2: number2,
      isCorrect: checkIsCorrect
    }])
    return checkIsCorrect;
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (/^[0-9]*$/.test(input)) {
      setInputValue(input);
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // function call
      checkAnswer();
      
      setTimeout(() => {
        setIsCorrect(null);
        createNumbers();
        setInputValue('');
      }, 250);
      }
    }

  return (
    <>
      <div className='flex justify-between font-poppins'>
        <h3 className='font-fun'>Multiplication</h3>
        <TimerDisplay />
      </div>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='text-6xl flex flex-col w-28 text-right gap-2'>
          <p>{number1}</p>
          <p className='border-b-4 border-black pb-2'><span>x</span>{number2}</p>
          <input 
            className={
              isCorrect
              ? "text-right focus:outline-none caret-transparent text-candyGreen"
              : isCorrect === null
              ? "text-right focus:outline-none caret-transparent"
              : "text-right focus:outline-none caret-transparent text-candyRed"
            } 
            type="text" 
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            ref={inputRef}
          />
        </div>
      </div>
    </>
  )
}

export default QuizCard