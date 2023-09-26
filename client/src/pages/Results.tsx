import React from 'react'
import ResultsCard from '../components/ResultsCard'
import CardLayout from '../components/layouts/CardLayout'

const Results = () => {

  return (
    <div className='w-screen h-screen page-background flex justify-center items-center p-8'>
      <CardLayout>
        <ResultsCard />
      </CardLayout>
    </div>
  )
}

export default Results