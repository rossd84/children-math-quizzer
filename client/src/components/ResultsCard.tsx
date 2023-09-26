
import { useUser } from '../context/UserContext'
import { useTimer } from '../context/TimerContext'
import { Link } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext'

const ResultsCard = () => {
  const {userAnswerList, clearUserAnswerList} = useUser()
  const {resetTimer}= useTimer();
  const {numberOfQuestions} = useSettings();
  const totalQuestions = userAnswerList.length;
  const correctQuestions = userAnswerList.filter(x => x.isCorrect).length;
  const missedQuestions = userAnswerList.filter(x => !x.isCorrect);
  const grade = totalQuestions > 0 ? `${(correctQuestions / numberOfQuestions * 100).toFixed(0)}%` : 'No questions answered'

  const handleReset = () => {
    clearUserAnswerList();
    resetTimer();
  }

  return (
    <div className='flex flex-col text-xl gap-4 justify-center text-center'>
      <div className='flex flex-col justify-center items-center pb-4 gap-4 border-b-4 border-candyYellow'>
        <p>Total attempted: {totalQuestions} / {numberOfQuestions}</p>
        <p>Grade: {grade}</p>
        <Link className='bg-candyPurple text-white rounded-lg py-4 px-20 text-2xl font-fun' onClick={handleReset} to="/">Reset</Link>
      </div>
      <p>Missed questions: </p>
      <ul className='flex gap-8'>
        {missedQuestions.map((q, idx) => (
          <li key={idx}>{q.num1}x{q.num2}</li>
        ))}
      </ul>
    </div>
  )
}

export default ResultsCard