'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useSession } from 'next-auth/react'

type matchStatus = 'searching' | 'matched' | 'timeout'
interface Problem {
  id: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  time_limit_ms: number
  memory_limit_kb: number
  solvedCount?: number
  acceptanceRate?: number
}

export default function WaitingPage({
  problemId,
  // problemTitle,
  // difficulty,
  // userId,
}: {
  problemId: string
  // problemTitle: string
  // difficulty: string
  // userId: string
}) {
  const { data: session, status } = useSession()

  const router = useRouter()
  const [problems, setproblems] = useState<Problem>()
  const [matchStatus, setmatchStatus] = useState<matchStatus>('searching')
  const [timeLeft, setTimeLeft] = useState(60)
  const [dots, setDots] = useState('.')
  const [opponent, setOpponent] = useState<string | null>(null)
  const [matchId, setMatchId] = useState<string | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // fetching the problem
  useEffect(() => {
    let isMounted = true

    const fetchTheProlem = async () => {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/get-problem?problemId=${problemId}`
      )
      if (isMounted) setproblems(result.data.problem)
    }

    fetchTheProlem()
    return () => {
      isMounted = false
    }
  }, [])

  // ── animated dots ──
  useEffect(() => {
    const d = setInterval(() => {
      setDots((p) => (p.length >= 3 ? '.' : p + '.'))
    }, 500)
    return () => clearInterval(d)
  }, [])

  // ── countdown ──

  useEffect(() => {
    if (matchStatus !== 'searching') return
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          setmatchStatus('timeout')
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current!)
  }, [matchStatus])

  // ── call match API ──
  useEffect(() => {
    if (status !== 'authenticated') return
    if (!problems) return

    const findMatch = async () => {
      try {
        const form = new FormData()

        form.append('userId', session.user.id)
        form.append('problemId', problems.id)
        form.append('title', problems.title)

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/searching-for-match`,
          form
        )

        if (res && res.data.match) {
          setOpponent(res.data.match.playerTwo ?? 'Opponent')
          setMatchId(res.data.match.id)
          setmatchStatus('matched')
          clearInterval(timerRef.current!)

          // redirect to battle after 2s  slug->matchid/userid/problemId
          setTimeout(() => {
            router.push(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/battle-ground/${res.data.match.id}/${session.user.id}/${res.data.match.problem_Id}`
            )
          }, 2000)
        } else {
          setmatchStatus('timeout')
        }
      } catch (err) {
        console.error(err)
        setmatchStatus('timeout')
      }
    }

    findMatch()
  }, [status, session, problems])

  const diffColor =
    problems?.difficulty === 'easy'
      ? 'text-[#2ECC71] bg-[#2ECC71]/10'
      : problems?.difficulty === 'medium'
        ? 'text-[#F4D03F] bg-[#F4D03F]/10'
        : 'text-[#E63946] bg-[#E63946]/10'

  const radius = 54
  const circum = 2 * Math.PI * radius
  const progress = (timeLeft / 60) * circum

  return (
    <main className='bg-[#0A0A0F] text-[#F0EFF4] min-h-screen flex flex-col items-center justify-center px-6 font-sans'>
      {/* ── CARD ── */}
      <div className='w-full max-w-md border border-[#1E1E2E] rounded-2xl bg-[#111118] overflow-hidden'>
        {/* top bar */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-[#1E1E2E] bg-[#E63946]/5'>
          <span className='font-mono text-sm font-semibold'>
            Code<span className='text-[#E63946]'>Duel</span>
          </span>
          <span
            className={`font-mono text-[10px] font-semibold px-2 py-1 rounded-md uppercase tracking-wide ${diffColor}`}
          >
            {problems?.difficulty}
          </span>
        </div>

        <div className='p-8 flex flex-col items-center text-center'>
          {/* ── SEARCHING STATE ── */}
          {matchStatus === 'searching' && (
            <>
              {/* circular timer */}
              <div className='relative mb-8'>
                <svg width='130' height='130' className='-rotate-90'>
                  {/* track */}
                  <circle cx='65' cy='65' r={radius} fill='none' stroke='#1E1E2E' strokeWidth='6' />
                  {/* progress */}
                  <circle
                    cx='65'
                    cy='65'
                    r={radius}
                    fill='none'
                    stroke='#E63946'
                    strokeWidth='6'
                    strokeLinecap='round'
                    strokeDasharray={circum}
                    strokeDashoffset={circum - progress}
                    className='transition-all duration-1000'
                  />
                </svg>
                {/* number inside */}
                <div className='absolute inset-0 flex flex-col items-center justify-center rotate-0'>
                  <span className='font-mono text-3xl font-bold text-white'>{timeLeft}</span>
                  <span className='font-mono text-[10px] text-[#6B6B80] uppercase tracking-widest'>
                    sec
                  </span>
                </div>
              </div>

              {/* pulsing dot */}
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-2 h-2 rounded-full bg-[#E63946] animate-pulse' />
                <span className='font-mono text-sm text-[#6B6B80]'>
                  Searching for opponent{dots}
                </span>
              </div>

              {/* problem card */}
              <div className='w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl p-4 text-left mb-6'>
                <p className='font-mono text-[10px] uppercase tracking-widest text-[#6B6B80] mb-2'>
                  Selected Problem
                </p>
                <p className='text-sm font-semibold'>{problems?.title}</p>
                <p className='font-mono text-xs text-[#6B6B80] mt-1'>{problemId}</p>
              </div>

              {/* player waiting */}
              <div className='w-full flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='w-9 h-9 rounded-full bg-[#2ECC71]/20 border border-[#2ECC71]/30 flex items-center justify-center text-xs font-bold text-[#2ECC71]'>
                    Y
                  </div>
                  <div className='text-left'>
                    <p className='text-sm font-medium'>You</p>
                    <p className='font-mono text-[10px] text-[#2ECC71]'>● Ready</p>
                  </div>
                </div>

                <div className='font-mono text-xs text-[#6B6B80] px-3 py-1 border border-[#1E1E2E] rounded-md'>
                  VS
                </div>

                <div className='flex items-center gap-3'>
                  <div className='text-right'>
                    <p className='text-sm font-medium text-[#6B6B80]'>Opponent</p>
                    <p className='font-mono text-[10px] text-[#6B6B80]'>○ Searching</p>
                  </div>
                  <div className='w-9 h-9 rounded-full bg-[#1E1E2E] border border-[#1E1E2E] flex items-center justify-center'>
                    <span className='text-[#6B6B80] text-lg animate-pulse'>?</span>
                  </div>
                </div>
              </div>

              {/* cancel */}
              <button
                onClick={() => router.back()}
                className='mt-8 text-xs text-[#6B6B80] hover:text-white font-mono underline underline-offset-4 transition-colors'
              >
                Cancel search
              </button>
            </>
          )}

          {/* ── MATCHED STATE ── */}
          {matchStatus === 'matched' && (
            <>
              <div className='w-16 h-16 rounded-full bg-[#2ECC71]/20 border border-[#2ECC71]/30 flex items-center justify-center mb-6'>
                <span className='text-2xl'>⚔️</span>
              </div>

              <h2 className='text-2xl font-bold tracking-tight mb-2'>Match Found!</h2>
              <p className='text-sm text-[#6B6B80] mb-8'>
                Get ready — battle starts in few seconds
              </p>

              {/* problem */}
              <div className='w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl p-4 text-left mb-6'>
                <p className='font-mono text-[10px] uppercase tracking-widest text-[#6B6B80] mb-2'>
                  Problem
                </p>
                <p className='text-sm font-semibold'>{problems?.title}</p>
              </div>

              {/* players */}
              <div className='w-full flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full bg-[#2ECC71]/20 border border-[#2ECC71]/40 flex items-center justify-center text-sm font-bold text-[#2ECC71]'>
                    Y
                  </div>
                  <div className='text-left'>
                    <p className='text-sm font-semibold'>You</p>
                    <p className='font-mono text-[10px] text-[#2ECC71]'>● Ready</p>
                  </div>
                </div>

                <div className='font-mono text-sm font-bold text-[#E63946] px-3 py-1 border border-[#E63946]/30 rounded-md bg-[#E63946]/10'>
                  VS
                </div>

                <div className='flex items-center gap-3'>
                  <div className='text-right'>
                    <p className='text-sm font-semibold'>{opponent}</p>
                    <p className='font-mono text-[10px] text-[#2ECC71]'>● Ready</p>
                  </div>
                  <div className='w-10 h-10 rounded-full bg-[#E63946]/20 border border-[#E63946]/40 flex items-center justify-center text-sm font-bold text-[#E63946]'>
                    {opponent?.[0]?.toUpperCase() ?? 'O'}
                  </div>
                </div>
              </div>

              {/* loading bar */}
              <div className='w-full h-1 bg-[#1E1E2E] rounded-full mt-8 overflow-hidden'>
                <div
                  className='h-full bg-[#E63946] rounded-full animate-[loading_2s_ease-in-out_forwards]'
                  style={{ animation: 'width 2s linear forwards', width: '100%' }}
                />
              </div>
              <p className='font-mono text-[10px] text-[#6B6B80] mt-2'>
                Redirecting to battlefield{dots}
              </p>
            </>
          )}

          {/* ── TIMEOUT STATE ── */}
          {matchStatus === 'timeout' && (
            <>
              <div className='w-16 h-16 rounded-full bg-[#E63946]/10 border border-[#E63946]/20 flex items-center justify-center mb-6'>
                <span className='text-2xl'>⏱️</span>
              </div>

              <h2 className='text-2xl font-bold tracking-tight mb-2'>No Opponent Found</h2>
              <p className='text-sm text-[#6B6B80] mb-8'>
                No one joined in 60 seconds. Try again or pick a different problem.
              </p>

              <div className='flex flex-col gap-3 w-full'>
                <button
                  onClick={() => {
                    setmatchStatus('searching')
                    setTimeLeft(60)
                    setDots('.')
                  }}
                  className='w-full py-3 rounded-xl bg-[#E63946] text-white text-sm font-semibold hover:opacity-90 transition-opacity'
                >
                  Search Again
                </button>
                <button
                  onClick={() => router.push('/problems')}
                  className='w-full py-3 rounded-xl border border-[#1E1E2E] text-[#6B6B80] text-sm font-medium hover:border-[#6B6B80] hover:text-white transition-all'
                >
                  Pick Different Problem
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* bottom hint */}
      {matchStatus === 'searching' && (
        <p className='mt-6 font-mono text-[11px] text-[#6B6B80] text-center max-w-sm'>
          Matching you with someone on the same problem and difficulty. If no match in 60s, criteria
          will relax.
        </p>
      )}
    </main>
  )
}
