
import { useUser } from '../context/UserContext'
import { useTimer } from '../context/TimerContext'
import { Link } from 'react-router-dom'

const ResultsCard = ({totalCards}) => {
  const {userAnswers, setUserAnswers} = useUser()
  const {resetTimer}= useTimer();
  const totalQuestions = userAnswers.length;
  const correctQuestions = userAnswers.filter(x => x.isCorrect).length;
  const missedQuestions = userAnswers.filter(x => !x.isCorrect);
  const grade = totalQuestions > 0 ? `${(correctQuestions / totalCards * 100).toFixed(0)}%` : 'No questions answered'

  const handleReset = () => {
    setUserAnswers([]);
    resetTimer();
  }

  return (
    <div className='flex flex-col text-xl gap-4 justify-center text-center'>
      <div className='flex flex-col justify-center items-center pb-4 gap-4 border-b-4 border-candyYellow'>
        <p>Total attempted: {totalQuestions} / {totalCards}</p>
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