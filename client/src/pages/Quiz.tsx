import React from 'react'
import CardLayout from '../components/layouts/CardLayout'
import QuizCard from '../components/QuizCard'
import {TimerProvider, useTimer} from '../context/TimerContext'
import CompleteCard from '../components/CompleteCard'


const Quiz = () => {
  const {isComplete} = useTimer();
  const totalQuestions: number = 25;
  return (
      <div className='w-screen h-screen page-background flex justify-center items-center p-8'>
        <CardLayout>
          {
            isComplete
            ? <CompleteCard
              totalCards={totalQuestions}
            />
            : <QuizCard
                totalCards={totalQuestions}
            />
          }
        </CardLayout>
      </div>
  )
}

export default Quiz