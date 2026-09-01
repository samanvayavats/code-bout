'use client'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import NotAuthenicated from '@/src/components/ui/not-authenticated'
import ApiError from '@/src/components/ui/api-error'
type Leader = {
  // rank: number;
  id: string
  name: string
  wins: number
  losses: number
}

export default function LeaderboardPage() {
  const [leaders, setleaders] = useState<Leader[]>([])
  const [error, seterror] = useState('')
  const { data: session } = useSession()

  useEffect(() => {
    const fetchUsersLeaderboard = async () => {
      try {
        const result = await axios.get('http://localhost:3000/api/leaderboard')
        setleaders(result.data.users)
      } catch {
        seterror('Something Went Wrong')
      }
    }

    fetchUsersLeaderboard()
  }, [])

  if (!session) {
    return <NotAuthenicated />
  }

  if (error) {
    return <ApiError message={error} />
  }

  return (
    <main className='min-h-screen bg-[#0A0A0F] p-6 text-[#F0EFF4]'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-6 text-2xl font-bold'>
          <span className='text-[#E63946]'>Leader</span>board
        </h1>

        {/* ── TABLE ── */}
        <div className='border border-[#1E1E2E] rounded-xl overflow-hidden'>
          {/* header */}
          <div className='grid grid-cols-4 gap-4 bg-[#111118] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#6B6B80]'>
            <div>Rank</div>
            <div>Name</div>
            <div>Wins</div>
            <div>Lose</div>
          </div>

          {/* rows */}
          {leaders.length === 0 ? (
            <div className='py-20 text-center text-[#6B6B80] text-sm'>No players found.</div>
          ) : (
            leaders.map((l, index) => (
              <div
                key={l.id}
                className='grid grid-cols-4 gap-4 border-t border-[#1E1E2E] px-5 py-4 text-sm'
              >
                <div className={`${index < 3 ? 'text-[#E63946]' : 'text-white'}`}>{index + 1}</div>
                <div>{l.name.toLocaleUpperCase()}</div>
                <div>{l.wins}</div>
                <div>{l.losses}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
