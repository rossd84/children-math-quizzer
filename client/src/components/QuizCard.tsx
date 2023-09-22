import { 
  useState,
  useRef,
  useContext,
  ChangeEvent, 
  KeyboardEvent,
  useEffect, 
} from 'react'
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
  const {startTimer, isStarted, setSeconds, seconds, setIsComplete } = useTimer();
  // references
  const inputRef = useRef<HTMLInputElement | null>(null);
  const minutesRef = useRef<HTMLInputElement | null>(null);
  const minimumRef = useRef<HTMLInputElement | null>(null);
  const maximumRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if(userAnswers.length >= totalCards) {
      setIsComplete(true)
    }
  }, [userAnswers])

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

  const handleStart = () => {
    createNumbers();
    startTimer();

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (/^[0-9]*$/.test(input)) {
      setInputValue(input);
    }
  }

  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    setSeconds(parseInt(value) * 60);
  }

  const handleMinimumChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinNumber(parseInt(value));
    // setSeconds(minutes * 60);
  }

  const handleMaximumChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxNumber(parseInt(value));
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
      {
        !isStarted
        ? <div className='flex flex-col gap-8 justify-evenly items-center h-full font-poppins'>
            <h1 className='text-6xl font-fun'>Elijah's Math App</h1>
            <div className='flex gap-4 text-xl'>
              <label htmlFor='minuteSelector'>Minutes: </label>
              <input className='w-10' ref={minutesRef} type='number' defaultValue={seconds / 60} min={1} max={5} onChange={handleMinutesChange} />
              <label htmlFor='minSelector'>Min: </label>
              <input className='w-10' ref={minimumRef} type='number' value={minNumber} min={0} max={12} onChange={handleMinimumChange} />
              <label htmlFor='maxSelector'>Max: </label>
              <input className='w-10' ref={maximumRef} type='number' value={maxNumber} min={0} max={12} onChange={handleMaximumChange} />
            </div>
            <div className='flex justify-center items-center h-[100px]'>
              <button className='py-6 px-12 text-4xl bg-candyGreen text-white rounded-lg font-fun drop-shadow-md border-b-4 border-l-2 border-candyRed hover:border-none' type='button' onClick={handleStart}>START</button>
            </div>
          </div>
        
        : <>
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
      }
    </>
  )
}

export default QuizCard