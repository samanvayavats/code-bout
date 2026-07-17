'use client'
import { useState, useEffect } from 'react'
import RedButton from './red-button'
import axios from 'axios'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
// ── types ──
type Difficulty = 'all' | 'easy' | 'medium' | 'hard'
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

const PER_PAGE = 10

const diffColor = (d: string) =>
  ({
    easy: 'text-[#2ECC71] bg-[#2ECC71]/10',
    medium: 'text-[#F4D03F] bg-[#F4D03F]/10',
    hard: 'text-[#E63946] bg-[#E63946]/10',
  })[d] ?? ''

export default function ProblemsPage() {
  const { data: session, status } = useSession()

  const [problems, setproblems] = useState<Problem[]>([])

  useEffect(() => {
    let ismounted = true

    const fetchPorblem = async () => {
      try {
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/all-problems`
        )
        if (ismounted) {
          setproblems(result.data.problems)
        }
      } catch (error) {
        console.log('error at the time of fetching the data ', error)
      }
    }

    fetchPorblem()

    console.log('problems ', problems)
    return () => {
      ismounted = false
    }
  }, [])

  const [difficulty, setDifficulty] = useState<Difficulty>('all')
  const [topic, setTopic] = useState('All Topics')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  // // ── filter ──
  const filtered = problems.filter((p) => {
    const matchDiff = difficulty === 'all' || p.difficulty === difficulty
    const matchTopic = topic === 'All Topics' || p.topic === topic
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    return matchDiff && matchTopic && matchSearch
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleFilter = (fn: () => void) => {
    fn()
    setPage(1)
  }

  // // ── pagination range ──
  const getPages = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (page <= 3) return [1, 2, 3, 4, '...', totalPages]
    if (page >= totalPages - 2)
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [1, '...', page - 1, page, page + 1, '...', totalPages]
  }

  const TOPIC = [
    'Arrays',
    'Strings',
    'Linked List',
    'Stack & Queue',
    'Trees',
    'Graphs',
    'Dynamic Programming',
    'Hashing',
    'Recursion',
    'Binary Search',
    'Two Pointers',
    'Heap',
    'Trie',
    'Bit Manipulation',
  ]

  // if (status === "loading") {
  //   return <p>Loading authentication state...</p>;
  // }

  // if (status === "unauthenticated") {
  //   return <p>You are not signed in.</p>;
  // }

  return (
    <main className='bg-[#0A0A0F] text-[#F0EFF4] min-h-screen font-sans'>
      {/* ── HEADER ── */}
      <div className='border-b border-[#1E1E2E] px-8 py-6'>
        <p className='font-mono text-[11px] tracking-[3px] uppercase text-[#E63946] mb-1'>
          Problem Bank
        </p>
        <h1 className='text-2xl font-bold tracking-tight'>All Problems</h1>
        <p className='text-sm text-[#6B6B80] mt-1'>
          {filtered.length} problems · pick one to duel on
        </p>
      </div>

      <div className='px-8 py-6 max-w-6xl mx-auto'>
        {/* ── FILTERS ── */}
        <div className='flex flex-col sm:flex-row gap-3 mb-6'>
          {/* search */}
          <input
            type='text'
            placeholder='Search problems...'
            value={search}
            onChange={(e) => handleFilter(() => setSearch(e.target.value))}
            className='flex-1 bg-[#111118] border border-[#1E1E2E] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#6B6B80] focus:outline-none focus:border-[#E63946] transition-colors font-mono'
          />

          {/* difficulty */}
          <div className='flex gap-2'>
            {(['all', 'easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
              <button
                key={d}
                onClick={() => handleFilter(() => setDifficulty(d))}
                className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all border ${
                  difficulty === d
                    ? d === 'all'
                      ? 'bg-[#E63946] border-[#E63946] text-white'
                      : d === 'easy'
                        ? 'bg-[#2ECC71]/20 border-[#2ECC71] text-[#2ECC71]'
                        : d === 'medium'
                          ? 'bg-[#F4D03F]/20 border-[#F4D03F] text-[#F4D03F]'
                          : 'bg-[#E63946]/20 border-[#E63946] text-[#E63946]'
                    : 'border-[#1E1E2E] text-[#6B6B80] hover:border-[#6B6B80]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* topic */}
          <select
            value={topic}
            onChange={(e) => handleFilter(() => setTopic(e.target.value))}
            className='bg-[#111118] border border-[#1E1E2E] rounded-lg px-3 py-2.5 text-sm text-[#F0EFF4] focus:outline-none focus:border-[#E63946] transition-colors font-mono'
          >
            {TOPIC.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* ── TABLE ── */}
        <div className='border border-[#1E1E2E] rounded-xl overflow-hidden  '>
          {/* table header */}
          <div className='grid grid-cols-12 gap-4 px-5 py-3 bg-[#111118] border-b border-[#1E1E2E] text-[11px] font-semibold uppercase tracking-widest text-[#6B6B80]'>
            <div className='col-span-1'>#</div>
            <div className='col-span-4'>Title</div>
            <div className='col-span-2'>Topic</div>
            <div className='col-span-2'>Difficulty</div>
            <div className='col-span-1'>Limit</div>
            <div className='col-span-1 text-right'>Acc%</div>
            <div className='col-span-1 text-right'>Join-Arena</div>
          </div>

          {/* rows */}
          {paginated.length === 0 ? (
            <div className='py-20 text-center text-[#6B6B80] text-sm'>
              No problems match your filters.
            </div>
          ) : (
            paginated.map((p, i) => (
              <div
                key={p.id}
                className='grid grid-cols-12 gap-4 px-5 py-4 border-b border-[#1E1E2E] last:border-b-0 hover:bg-[#111118] transition-colors group cursor-pointer'
              >
                {/* number */}
                <div className='col-span-1 font-mono text-xs text-[#6B6B80] flex items-center'>
                  {(page - 1) * PER_PAGE + i + 1}
                </div>

                {/* title */}
                <div className='col-span-4 flex items-center'>
                  <span className='text-sm font-medium group-hover:text-[#E63946] transition-colors'>
                    {p.title}
                  </span>
                </div>

                {/* topic */}
                <div className='col-span-2 flex items-center'>
                  <span className='font-mono text-xs text-[#6B6B80] bg-[#1E1E2E] px-2 py-1 rounded-md'>
                    {p.topic}
                  </span>
                </div>

                {/* difficulty */}
                <div className='col-span-2 flex items-center'>
                  <span
                    className={`font-mono text-[10px] font-semibold px-2 py-1 rounded-md uppercase tracking-wide ${diffColor(p.difficulty)}`}
                  >
                    {p.difficulty}
                  </span>
                </div>

                {/* time limit */}
                <div className='col-span-1 flex items-center font-mono text-xs text-[#6B6B80]'>
                  {p.time_limit_ms}ms
                </div>

                {/* acceptance */}
                <div className='col-span-1 flex items-center  font-mono text-xs text-[#6B6B80]'>
                  {p.acceptanceRate}%
                </div>

                {/* join arena */}
                <Link href={`/waiting-area/${p.id}`}>
                  <div className='col-span-1 flex items-center justify-end'>
                    <RedButton>1v1</RedButton>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <div className='flex items-center justify-between mt-6'>
            {/* info */}
            <p className='text-xs text-[#6B6B80] font-mono'>
              Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of{' '}
              {filtered.length}
            </p>

            {/* pages */}
            <div className='flex items-center gap-1'>
              {/* prev */}
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className='px-3 py-2 rounded-lg text-xs font-mono border border-[#1E1E2E] text-[#6B6B80] hover:border-[#6B6B80] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all'
              >
                ← Prev
              </button>

              {/* page numbers */}
              {getPages().map((p, i) =>
                p === '...' ? (
                  <span key={`dot-${i}`} className='px-2 text-[#6B6B80] font-mono text-xs'>
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(Number(p))}
                    className={`w-9 h-9 rounded-lg text-xs font-mono font-semibold transition-all border ${
                      page === p
                        ? 'bg-[#E63946] border-[#E63946] text-white'
                        : 'border-[#1E1E2E] text-[#6B6B80] hover:border-[#6B6B80] hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              {/* next */}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className='px-3 py-2 rounded-lg text-xs font-mono border border-[#1E1E2E] text-[#6B6B80] hover:border-[#6B6B80] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all'
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
