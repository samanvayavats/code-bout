'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import NotAuthenicated from '@/src/components/ui/not-authenticated'
import ApiError from '@/src/components/ui/api-error'
type Result = {
  id: string
  user_Id: string
  winner_Id: string
  losser_Id: string
  match_Id: string
  average_Verdict: number
  average_exec_time_ms: string
  average_memory_kb: string
  submission_Time: string
  pointCount: number
  code: string
  created_At: string
}

export default function ResultsPage({ matchId }: { matchId: string }) {
  const { data: session } = useSession()
  const router = useRouter()

  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const currentUserId = (session?.user as any)?.id

  useEffect(() => {
    if (!matchId) return

    const fetchResults = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/results/get-result?matchId=${matchId}`
        )
        // console.log("the match result is ",res)
        setResults(res.data.results)
      } catch (err) {
        setError('Failed to load results.')
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [matchId])

  // ── derive my result and opponent result ──
  const myResult = results.find((r) => r.user_Id === currentUserId)
  const opponentResult = results.find((r) => r.user_Id !== currentUserId)

  const iWon = myResult?.winner_Id === currentUserId
  const iLost = myResult?.losser_Id === currentUserId
  const isDraw = myResult?.winner_Id === myResult?.losser_Id

  // ── loading ──
  if (loading) {
    return (
      <main className='bg-[#0A0A0F] min-h-screen flex items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-10 h-10 border-2 border-[#E63946] border-t-transparent rounded-full animate-spin' />
          <p className='font-mono text-sm text-[#6B6B80]'>Calculating results...</p>
        </div>
      </main>
    )
  }

  if (!session) {
    return <NotAuthenicated />
  }

  // ── error ──

  if (error) {
    return (
      <main className='bg-[#0A0A0F] min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-[#E63946] font-mono text-sm mb-4'>{error}</p>
          <button
            onClick={() => router.push('/problems')}
            className='text-xs text-[#6B6B80] underline'
          >
            Back to problems
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className='bg-[#0A0A0F] text-[#F0EFF4] min-h-screen font-sans'>
      <div className='max-w-3xl mx-auto px-6 py-12'>
        {/* ── WINNER BANNER ── */}
        <div
          className={`rounded-2xl border p-8 text-center mb-10 ${
            iWon
              ? 'bg-[#2ECC71]/10 border-[#2ECC71]/30'
              : iLost
                ? 'bg-[#E63946]/10 border-[#E63946]/30'
                : 'bg-[#F4D03F]/10 border-[#F4D03F]/30'
          }`}
        >
          <div className='text-5xl mb-4'>{iWon ? '🏆' : iLost ? '💀' : '🤝'}</div>
          <h1
            className={`text-3xl font-bold tracking-tight mb-2 ${
              iWon ? 'text-[#2ECC71]' : iLost ? 'text-[#E63946]' : 'text-[#F4D03F]'
            }`}
          >
            {iWon ? 'You Won!' : iLost ? 'You Lost' : 'Draw!'}
          </h1>
          <p className='text-sm text-[#6B6B80]'>
            {iWon
              ? 'Great job — you outperformed your opponent.'
              : iLost
                ? 'Better luck next time. Review your solution below.'
                : 'Both players performed equally well.'}
          </p>
        </div>

        {/* ── SCORE COMPARISON ── */}
        <div className='grid grid-cols-2 gap-4 mb-8'>
          {/* my score */}
          <div
            className={`bg-[#111118] border rounded-xl p-6 ${
              iWon ? 'border-[#2ECC71]/30' : 'border-[#1E1E2E]'
            }`}
          >
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-[#2ECC71]' />
                <span className='text-xs font-semibold text-[#2ECC71]'>You</span>
              </div>
              {iWon && (
                <span className='font-mono text-[10px] px-2 py-0.5 rounded-md bg-[#2ECC71]/15 text-[#2ECC71] uppercase tracking-wide'>
                  Winner
                </span>
              )}
            </div>

            {myResult ? (
              <div className='space-y-3'>
                <StatRow
                  label='Verdict'
                  value={`${myResult.average_Verdict}%`}
                  highlight={myResult.average_Verdict === 100}
                />
                <StatRow label='Exec Time' value={`${myResult.average_exec_time_ms}ms`} />
                <StatRow
                  label='Memory'
                  value={`${parseFloat(myResult.average_memory_kb).toFixed(0)}KB`}
                />
                <StatRow label='Points' value={String(myResult.pointCount)} highlight />
                <StatRow
                  label='Submitted'
                  value={new Date(myResult.submission_Time).toLocaleTimeString()}
                />
              </div>
            ) : (
              <p className='text-xs text-[#6B6B80]'>No submission</p>
            )}
          </div>

          {/* opponent score */}
          <div
            className={`bg-[#111118] border rounded-xl p-6 ${
              iLost ? 'border-[#E63946]/30' : 'border-[#1E1E2E]'
            }`}
          >
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-[#E63946]' />
                <span className='text-xs font-semibold text-[#E63946]'>Opponent</span>
              </div>
              {iLost && (
                <span className='font-mono text-[10px] px-2 py-0.5 rounded-md bg-[#E63946]/15 text-[#E63946] uppercase tracking-wide'>
                  Winner
                </span>
              )}
            </div>

            {opponentResult ? (
              <div className='space-y-3'>
                <StatRow
                  label='Verdict'
                  value={`${opponentResult.average_Verdict}%`}
                  highlight={opponentResult.average_Verdict === 100}
                />
                <StatRow label='Exec Time' value={`${opponentResult.average_exec_time_ms}ms`} />
                <StatRow
                  label='Memory'
                  value={`${parseFloat(opponentResult.average_memory_kb).toFixed(0)}KB`}
                />
                <StatRow label='Points' value={String(opponentResult.pointCount)} />
                <StatRow
                  label='Submitted'
                  value={new Date(opponentResult.submission_Time).toLocaleTimeString()}
                />
              </div>
            ) : (
              <p className='text-xs text-[#6B6B80]'>No submission</p>
            )}
          </div>
        </div>

        {/* ── SCORING BREAKDOWN ── */}
        <div className='bg-[#111118] border border-[#1E1E2E] rounded-xl p-6 mb-8'>
          <p className='font-mono text-[11px] uppercase tracking-widest text-[#6B6B80] mb-4'>
            How points were calculated
          </p>
          <div className='space-y-3 text-sm text-[#6B6B80]'>
            <div className='flex items-start gap-3'>
              <span className='text-[#2ECC71] mt-0.5'>✓</span>
              <span>
                <span className='text-white font-medium'>Correctness (primary)</span> — all hidden
                test cases must pass. Wrong answer = 0 points.
              </span>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-[#F4D03F] mt-0.5'>⚡</span>
              <span>
                <span className='text-white font-medium'>Speed (secondary)</span> — faster execution
                time earns more points.
              </span>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-[#6B6B80] mt-0.5'>💾</span>
              <span>
                <span className='text-white font-medium'>Memory (tiebreaker)</span> — lower memory
                usage breaks ties.
              </span>
            </div>
          </div>
        </div>

        {/* ── MY CODE ── */}
        {myResult?.code && (
          <div className='bg-[#111118] border border-[#1E1E2E] rounded-xl overflow-hidden mb-8'>
            <div className='flex items-center justify-between px-5 py-3 border-b border-[#1E1E2E]'>
              <p className='font-mono text-[11px] uppercase tracking-widest text-[#6B6B80]'>
                Your submission
              </p>
              <span className='font-mono text-[10px] text-[#6B6B80]'>JavaScript</span>
            </div>
            <pre className='p-5 font-mono text-xs text-[#ABB2BF] leading-relaxed overflow-x-auto bg-[#0D0D14]'>
              <code>{myResult.code}</code>
            </pre>
          </div>
        )}

        {/* ── ACTIONS ── */}
        <div className='flex gap-3'>
          <Link
            href='/problems'
            className='flex-1 py-3 rounded-xl bg-[#E63946] text-white text-sm font-semibold text-center hover:opacity-90 transition-opacity'
          >
            Play Again
          </Link>
          <Link
            href='/'
            className='flex-1 py-3 rounded-xl border border-[#1E1E2E] text-[#6B6B80] text-sm font-medium text-center hover:border-[#6B6B80] hover:text-white transition-all'
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  )
}

// ── small helper ──
function StatRow({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className='flex items-center justify-between'>
      <span className='font-mono text-[11px] text-[#6B6B80] uppercase tracking-wide'>{label}</span>
      <span
        className={`font-mono text-sm font-semibold ${highlight ? 'text-[#2ECC71]' : 'text-[#F0EFF4]'}`}
      >
        {value}
      </span>
    </div>
  )
}
