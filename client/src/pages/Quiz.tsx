import QuizCard from '../components/QuizCard'
import CardLayout from '../components/layouts/CardLayout'


const Quiz = () => {

  return (
      <div className='w-screen h-screen page-background flex justify-center items-center p-8'>
        <CardLayout>
          <QuizCard />
        </CardLayout>
      </div>
  )
}

export default Quiz