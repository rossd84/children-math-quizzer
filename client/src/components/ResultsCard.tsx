
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
      <div className='flex flex-col justify-center items-center pb-4 gap-2 border-b-4 border-candyYellow'>
        <p>Total attempted: {totalQuestions} / {numberOfQuestions}</p>
        <p>Wrong attempted answers: {missedQuestions.length}</p>
        <p>Grade: {correctQuestions}/{numberOfQuestions} ({grade})</p>
        <Link className='bg-candyPurple text-white rounded-lg py-4 px-20 text-2xl font-fun' onClick={handleReset} to="/">Reset</Link>
      </div>
      <div className='flex flex-col text-2xl'>
        <h3>Attempted Answers </h3>
        <div className='flex justify-center mt-4'>
          <ul className='grid grid-cols-5 gap-4'>
            {userAnswerList.map((answer, idx) => (
              <li className={answer.isCorrect ? 'flex' : 'flex text-candyRed'} key={idx}>
                {answer.num1}x{answer.num2} = {answer.answer}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ResultsCard