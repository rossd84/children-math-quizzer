import { useState, useRef, ChangeEvent } from 'react'
import { Link } from 'react-router-dom';
import { useTimer } from '../context/TimerContext'
import CardLayout from '../components/layouts/CardLayout';


const Home = () => {
  // state
  const [minNumber, setMinNumber] = useState<number>(0)
  const [maxNumber, setMaxNumber] = useState<number>(12)
  // context
  const { seconds, setSeconds } = useTimer();
  // refs
  const minutesRef = useRef<HTMLInputElement | null>(null);
  const minimumRef = useRef<HTMLInputElement | null>(null);
  const maximumRef = useRef<HTMLInputElement | null>(null);

  // const handleStart = () => {
  //   startTimer();
  // }

  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    setSeconds(parseInt(value) * 60);
  }

  const handleMinimumChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinNumber(parseInt(value));
  }

  const handleMaximumChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxNumber(parseInt(value));
  }

  return (
    <div className='w-screen h-screen page-background flex justify-center items-center p-8'>
      <CardLayout>
        <div className='flex flex-col gap-8 justify-evenly items-center h-full font-poppins'>
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