import React from 'react'
import BattleGround from '@/src/components/ui/battle-ground-page'

const Problem = {
  id: '1',
  title: 'string',
  description: 'string',
  diffculty: 'string',
  time_limit_ms: 1,
  memory_limit_kb: 2,
  TestCases: [
    { input: '1', expected_Output: '2', is_Hidden: false },
  ],
}

const page = () => {
  return (
    <BattleGround matchId={'1'} userId={'2'} problem={Problem} />
  )
}

export default page
