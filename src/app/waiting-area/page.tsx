import React from 'react'
import WaitingPage from '@/src/components/ui/waiting-page'
const page = () => {
  const searchParams = {
    problemId: '1',
    title: 'two - sum',
    difficulty: 'easy',
    userId: '45454',
  }
  return (
    <div>
      <WaitingPage
        problemId={searchParams.problemId}
        problemTitle={searchParams.title}
        difficulty={searchParams.difficulty}
        userId={searchParams.userId}
      />
    </div>
  )
}

export default page
