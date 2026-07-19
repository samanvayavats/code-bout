'use client'
import React, { useEffect, useId, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
type Verdict =
  'Accepted' | 'Wrong Answer' | 'TLE' | 'MLE' | 'Runtime Error' | 'Compilation Error' | null

type TestCases = {
  id: string
  input: string
  expected_Output: string
  is_Hidden: boolean
  problem_Id: string
}

type Problem = {
  id: string
  title: string
  description: string
  difficulty: string
  starter_code: string
  time_limit_ms: number
  memory_limit_kb: number
  TestCases: TestCases[]
}

type TestResult = {
  input: string
  expected: string
  actual: string
  verdict: string
  exec_time_ms: number
  is_Hidden: boolean
}

const diffColor = (d: string) =>
  d === 'easy'
    ? 'text-[#2ECC71] bg-[#2ECC71]/10'
    : d === 'medium'
      ? 'text-[#F4D03F] bg-[#F4D03F]/10'
      : 'text-[#E63946] bg-[#E63946]/10'

const verdictColor = (v: string) =>
  v === 'Accepted' ? 'text-[#2ECC71]' : v === 'TLE' ? 'text-[#F4D03F]' : 'text-[#E63946]'

const BattleGround = ({
  matchId,
  userId,
  problemId,
}: {
  matchId: string
  userId: string
  problemId: string
}) => {
  const router = useRouter()

  const [code, setCode] = useState('')
  // session
  const { data: session, status } = useSession()

  // WebSocket connection
  const websocketRef = useRef<WebSocket | null>(null)

  // statehook to check if both the user has joined
  const [bothJoined, setbothJoined] = useState<boolean>(false)

  // problem hook
  const [problems, setproblems] = useState<Problem>()
  // testcases hook
  const [testCases, settestCases] = useState<TestCases[]>()

  // code editor state
  const [solutionStarterCode, setSolutionStarterCode] = useState(
    `function solution() {\n  // Write your code here\n}`
  )

  // ── match state ──
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 min
  const [opponentDone, setOpponentDone] = useState(false)
  const [opponentVerdict, setOpponentVerdict] = useState<string | null>(null)
  //your state
  const [userDone, setuserDone] = useState(false)

  //for running the testcases and probelm toggle

  const [problemAndTestcasesToggle, setproblemAndTestcasesToggle] = useState<boolean>(false)
  const handlerToggleproblemAndTestcases = () => {
    setproblemAndTestcasesToggle(!problemAndTestcasesToggle)
  }

  // for code submission
  // ── submission state ──
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResult, settestResult] = useState<TestResult[]>()
  const [submitVerdict, setSubmitVerdict] = useState<Verdict>(null)
  const [submitTime, setSubmitTime] = useState<number | null>(null)
  const [submitMemory, setSubmitMemory] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isCodeSubmitted, setisCodeSubmitted] = useState<boolean>(false)

  // check that user can only run the code for 3 times
  const [runCodeThreeTimes, setrunCodeThreeTimes] = useState<number>(0)

  // fetching the particular problem
  useEffect(() => {
    let isMounted = true
    const fetchProblem = async () => {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/get-problem?problemId=${problemId}`
      )
      console.log('problem data  :  ', result.data)

      if (isMounted) {
        setproblems(result.data.problem)
        setSolutionStarterCode(result.data.problem.starter_code)
        settestCases(result.data.problem.TestCases)
      }
    }
    fetchProblem()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    // only connect when session is available
    if (!session?.user?.id) return

    const ws = new WebSocket('ws://localhost:8000')
    websocketRef.current = ws

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'user-connect',
          username: session.user.name,
          userId: userId,
          problemId: problemId,
        })
      )

      ws.send(
        JSON.stringify({
          type: 'match-found',
          useId: userId,
          matchName: matchId, // we are using the match id as the match name for the WebSocket
          problemId: problemId,
        })
      )
    }

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data)
      console.log('hello : ', msg)

      if (msg.type === 'match-started') {
        // ensure we read the correct field
        console.log('the length of players : ', msg.players?.length)
        if (Array.isArray(msg.players) && msg.players.length === 2) setbothJoined(true)
      }
    }

    return () => {
      // cleanup
      if (websocketRef.current) {
        websocketRef.current.close()
        websocketRef.current = null
      }
    }
  }, [])

  // ── format time ──
  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  // timer ref so we can clear interval on unmount
  const timerRef = useRef<number | null>(null)

  const startClock = () => {
    if (timerRef.current) return
    timerRef.current = window.setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 0) {
          if (timerRef.current) window.clearInterval(timerRef.current)
          timerRef.current = null
          return 0
        }
        return s - 1
      })
    }, 1000)
  }

  // starting the clock
  useEffect(() => {
    if (bothJoined) startClock()
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [bothJoined])

  const timerColor =
    timeLeft < 300 ? 'text-[#E63946]' : timeLeft < 600 ? 'text-[#F4D03F]' : 'text-[#F0EFF4]'

  const handleRunCode = async () => {
    setIsRunning(true)
    setrunCodeThreeTimes((run) => run + 1)
    toast.warn(`code running only ${2 - runCodeThreeTimes} chance left`)
    try {
      const form = new FormData()
      form.append('problemId', problemId)
      form.append('userId', userId)
      form.append('code', code)
      form.append('language', 'javascript')

      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/submissions/check-code`,
        form
      )
      settestResult(result.data.result.testResults)
      setSubmitVerdict(result.data.verdict)
    } catch (error) {
      console.log('error at the time running the code ')
    } finally {
      setIsRunning(false)
    }
  }

  const handlerSubmitCode = async () => {
    setIsRunning(true)
    toast.success('submitting code ')
    try {
      const form = new FormData()
      form.append('userId', userId)
      form.append('problemId', problemId)
      form.append('code', code)
      form.append('matchId', matchId)
      form.append('language', 'javascript')

      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/submissions/submit-code`,
        form
      )

      setisCodeSubmitted(true)
      websocketRef.current?.send(
        JSON.stringify({
          type: 'user-submit',
          userId: userId,
          matchId: matchId,
        })
      )

      toast.success('code submitted successfully , pls wait for results')
    } catch (error) {
      console.log('the error at the time of submitting the code')
    }
  }

  useEffect(() => {
    const ws = websocketRef.current
    if (!ws) return

    console.log('do we reaching the handler ----------------------')

    const handler = (e: any) => {
      const msg = JSON.parse(e?.data ?? e)
      if (msg.type === 'player-submit') {
        if (msg.userId !== userId) setOpponentDone(true)
        else setuserDone(true)
      }
    }

    ws.addEventListener('message', handler)

    if (opponentDone && userDone) {
      router.push(`/result/${matchId}`)
      ws.send(
        JSON.stringify({
          type: 'match-completed',
          matchName: matchId,
        })
      )
    }

    return () => {
      ws.removeEventListener('message', handler)
    }
  }, [opponentDone, userDone, userId, matchId, router])

  if (!problems) return <div>Loading...</div>

  return bothJoined ? (
    <main className='h-screen bg-[#07070A] flex flex-col'>
      {/* ========================= HEADER ========================= */}
      <header className='h-20 shrink-0 border-b border-[#1E1E2E] bg-[#111118] px-6 flex items-center justify-between'>
        {/* Left */}
        <div className='flex items-center gap-4'>
          <h1 className='text-lg font-semibold text-white'>{problems.title}</h1>

          <span
            className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${diffColor(
              problems.difficulty
            )}`}
          >
            {problems.difficulty}
          </span>
        </div>

        {/* Center */}
        <div className='flex items-center gap-2'>
          <span className='text-xs uppercase text-[#6B6B80]'>Time</span>

          <span className={`text-2xl font-bold ${timerColor}`}>{fmt(timeLeft)}</span>
        </div>

        {/* Right */}
        <div className='flex items-center gap-3'>
          {opponentDone ? (
            <div className='flex items-center gap-2 px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/20'>
              <div className='w-2 h-2 rounded-full bg-red-500' />
              <span className='text-xs text-red-400'>Opponent Submitted</span>
            </div>
          ) : (
            <div className='flex items-center gap-2 px-3 py-1 rounded-lg bg-[#1E1E2E]'>
              <div className='w-2 h-2 rounded-full bg-gray-400 animate-pulse' />
              <span className='text-xs text-[#8E8EA8]'>Opponent Coding...</span>
            </div>
          )}

          {runCodeThreeTimes < 3 ? (
            <button
              type='button'
              disabled={isRunning}
              onClick={handleRunCode}
              className={`px-4 py-2 rounded-md ${isRunning ? 'bg-[#559DFF]' : 'bg-[#2E8BFF]'} bg-[#2E8BFF] hover:bg-[#559DFF] text-sm font-semibold `}
            >
              Run
            </button>
          ) : (
            <></>
          )}
          <button
            onClick={handlerToggleproblemAndTestcases}
            className='px-4 py-2 rounded-md bg-[#E63946] hover:bg-[#e36570] text-sm font-semibold'
          >
            {!problemAndTestcasesToggle ? 'Check TestCase' : 'view Probelm'}
          </button>

          {isCodeSubmitted ? (
            <></>
          ) : (
            <button
              onClick={handlerSubmitCode}
              className='px-4 py-2 rounded-md bg-[#16A34A] hover:bg-[#22C55E] text-sm font-semibold'
            >
              Submit
            </button>
          )}
        </div>
      </header>

      {/* ========================= BODY ========================= */}
      <div className='flex flex-1 gap-4 p-4 overflow-hidden'>
        {/* ================= LEFT PANEL ================= */}
        {!problemAndTestcasesToggle ? (
          <div className='w-1/2 rounded-lg bg-[#0F1115] border border-[#1E1E2E] overflow-y-auto'>
            <div className='p-6 space-y-6'>
              <div className='text-[#CFCFD8] leading-relaxed whitespace-pre-wrap'>
                {problems.description}
              </div>

              <div>
                <h3 className='text-xs uppercase tracking-widest text-[#6B6B80] mb-4'>Examples</h3>

                {testCases
                  ?.filter((tc) => !tc.is_Hidden)
                  .map((tc, i) => (
                    <div
                      key={i}
                      className='mb-4 rounded-lg border border-[#1E1E2E] bg-[#09090D] p-4'
                    >
                      <p className='text-xs text-[#6B6B80] mb-3'>Example {i + 1}</p>

                      <div className='space-y-2 text-sm'>
                        <div>
                          <span className='text-[#6B6B80]'>Input:</span> {tc.input}
                        </div>

                        <div>
                          <span className='text-[#6B6B80]'>Output:</span> {tc.expected_Output}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className='w-1/2 rounded-lg bg-[#0F1115] border border-[#1E1E2E] overflow-y-auto flex flex-col '>
            {/* heading */}
            <div className='w-full p-2'>
              <h1 className='text-lg font-semibold '>Result of the Testcases : </h1>
            </div>

            {/* verdict */}
            <div className='space-y-4'>
              {/* submit verdict */}
              {isRunning ? (
                <div className='flex items-center gap-3 p-4 mx-1 bg-[#111118] border border-[#1E1E2E] rounded-xl'>
                  <div className='w-4 h-4 border-2 border-[#E63946] border-t-transparent rounded-full animate-spin' />
                  <span className='font-mono text-xs text-[#6B6B80]'>Running test cases...</span>
                </div>
              ) : (
                submitVerdict && (
                  <div
                    className={`p-4 rounded-xl border ${
                      submitVerdict === 'Accepted'
                        ? 'bg-[#2ECC71]/10 border-[#2ECC71]/30'
                        : 'bg-[#E63946]/10 border-[#E63946]/30'
                    }`}
                  >
                    <p className={`font-mono text-sm font-bold ${verdictColor(submitVerdict)}`}>
                      {submitVerdict === 'Accepted' ? '✓ ' : '✗ '}
                      {submitVerdict}
                    </p>
                    {submitTime && (
                      <div className='flex gap-4 mt-2'>
                        <span className='font-mono text-xs text-[#6B6B80]'>⚡ {submitTime}ms</span>
                        <span className='font-mono text-xs text-[#6B6B80]'>
                          💾 {submitMemory}KB
                        </span>
                      </div>
                    )}
                  </div>
                )
              )}
              {testResult &&
                testResult.map((r, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border ${
                      r.verdict === 'Accepted'
                        ? 'border-[#2ECC71]/20 bg-[#2ECC71]/5'
                        : 'border-[#E63946]/20 bg-[#E63946]/5'
                    }`}
                  >
                    <div className='flex items-center justify-between mb-2'>
                      <span className='font-mono text-xs font-semibold text-[#6B6B80]'>
                        Test Case {i + 1}
                      </span>
                      <span
                        className={`font-mono text-[10px] font-bold ${verdictColor(r.verdict)}`}
                      >
                        {r.verdict === 'Accepted' ? '✓ Pass' : '✗ Fail'}
                      </span>
                    </div>
                    <div className='font-mono text-[11px] space-y-1 text-[#B0B0C0]'>
                      <div>
                        <span className='text-[#6B6B80]'>Input: </span>
                        {r.input}
                      </div>
                      <div>
                        <span className='text-[#6B6B80]'>Expected: </span>
                        {r.expected}
                      </div>
                      <div>
                        <span className='text-[#6B6B80]'>Got: </span>
                        <span
                          className={r.verdict === 'Accepted' ? 'text-[#2ECC71]' : 'text-[#E63946]'}
                        >
                          {r.actual ?? 'null'}
                        </span>
                      </div>
                      {r.exec_time_ms && (
                        <div className='text-[#6B6B80]'>⚡ {r.exec_time_ms}ms</div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ================= RIGHT PANEL ================= */}
        <div className='w-1/2 rounded-lg border border-[#1E1E2E] bg-[#05060A] flex flex-col overflow-hidden'>
          {/* File Tab */}
          <div className='h-11 border-b border-[#1E1E2E] bg-[#0D0E13] px-4 flex items-center'>
            <span className='text-xs text-[#8E8EA8]'>solution.js</span>
          </div>

          {/* Editor */}
          <div className='flex-1 overflow-auto'>
            <div className='p-3'>
              <div className='text-[#8E8EA8]'>
                <span className='text-[#c6555e]'>{solutionStarterCode.replace('{CODE}}', '')}</span>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                autoComplete='off'
                autoCorrect='off'
                autoCapitalize='none'
                placeholder='// Write your code here'
                className='w-full h-[calc(100vh-220px)] bg-transparent resize-none outline-none border-none pl-4 pt-2 text-[#ECECF3] leading-7'
              />

              <div className='text-[#c6555e]'>{'}'}</div>
            </div>
          </div>
        </div>
      </div>
      {/* ---------finshed the codearea-------------- */}
    </main>
  ) : (
    <div className='flex items-center justify-center h-screen bg-[#0A0A0F] text-[#6B6B80] font-sans'>
      Let opponent join...
    </div>
  )
}
export default BattleGround
