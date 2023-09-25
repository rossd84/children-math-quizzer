import { useRef, ChangeEvent, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useTimer } from '../context/TimerContext'
import { useSettings } from '../context/SettingsContext';
import CardLayout from '../components/layouts/CardLayout';


const Home = () => {
  // context
  const { seconds, setSeconds, resetTimer } = useTimer();
  const { selectedNumbers, toggleNumberSelection, numberOfQuestions,setNumberOfQuestions } = useSettings();
  // refs
  const minutesRef = useRef<HTMLInputElement | null>(null);
  const numOfQuestions = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    resetTimer()
  }, [])

  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(typeof value, value)
    if (value === "") {
      setSeconds(60)
    } else if (/^[0-9]*$/.test(value)) {
      setSeconds(parseInt(value) * 60);
    }
  }

  const handleQuestionsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setNumberOfQuestions(1)
    } else if (parseInt(value) > 100) {
      setNumberOfQuestions(100);
    } else if (/^[0-9]*$/.test(value)) {
      setNumberOfQuestions(parseInt(value));
    }
  }

  const handleCheckboxChange = (number: number) => {
    toggleNumberSelection(number);
  };

  return (
    <div className='w-screen h-screen page-background flex justify-center items-center p-8 font-poppins text-2xl'>
      <CardLayout>
        <div className='flex flex-col gap-8 justify-evenly items-center h-full'>

          <h1 className='text-6xl font-fun'>Elijah's Math App</h1>
          
          <div className='flex justify-evenly w-full'>
            <div className='flex flex-col items-center gap-4'>
              <label htmlFor='minuteSelector'>Minutes: </label>
              <input 
                className='w-10' 
                ref={minutesRef} 
                type='number' 
                defaultValue={seconds / 60} 
                min={1} 
                max={5} 
                onChange={handleMinutesChange} 
              />
              <label>QuestionCount</label>
              <input 
                className='w-16' 
                ref={numOfQuestions}
                type='number'
                min={1}
                max={100}
                value={numberOfQuestions} 
                onChange={handleQuestionsChange} 
              />
            </div>
            
            <div className=''>
              <h2>Number Selection</h2>
              <form className='grid grid-cols-4 gap-4'>

                {[...Array(12).keys()].map((number) => (
                  <label className="flex flex-col items-center justify-end" key={number + 1}>
                    {number + 1}
                    <input
                      className='h-6 w-6 appearance-none border-2 border-candyPurple checked:bg-candyPurple rounded text-white'
                      type="checkbox"
                      value={number + 1}
                      checked={selectedNumbers.includes(number + 1)}
                      onChange={() => handleCheckboxChange(number + 1)}
                    />
                  </label>
                ))}
                
              </form>
            </div>
          </div>

          <div className='flex justify-center items-center h-[100px]'>
            <Link 
              className='py-6 px-12 text-4xl bg-candyGreen text-white rounded-lg font-fun drop-shadow-md border-b-4 border-l-2 border-candyRed hover:border-none' 
              type='button' 
              to="/quiz"
            >
              START
            </Link>
          </div>
        </div>
      </CardLayout>
    </div>
  )
}

export default Home