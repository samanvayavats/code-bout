import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/src/lib/prisma'
import { LANGUAGES, buildSolution, runCodeAgainstAllTestCases } from '@/src/lib/judge'

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData()

    const code = body.get('code') as string
    const language = body.get('language') as string
    const problemId = body.get('problemId') as string
    const matchId = body.get('matchId') as string
    const userId = body.get('userId') as string

    if (!code || !language || !problemId || !matchId) {
      return NextResponse.json(
        {
          message: 'Missing required fields',
        },
        {
          status: 400,
        }
      )
    }

    const languageId = LANGUAGES[language as keyof typeof LANGUAGES]

    if (!languageId) {
      return NextResponse.json(
        {
          message: 'Invalid Language',
        },
        {
          status: 400,
        }
      )
    }

    const problem = await prisma.problem.findUnique({
      where: {
        id: problemId,
      },
      select: {
        starter_code: true,
        TestCases: true,
      },
    })

    if (!problem) {
      return NextResponse.json(
        {
          message: 'Problem not found',
        },
        {
          status: 404,
        }
      )
    }

    const sourceCode = buildSolution(problem.starter_code, code)

    // const visibleTestCases = problem.TestCases.filter((tc) => !tc.is_Hidden) ?? []

    const result = await runCodeAgainstAllTestCases(sourceCode, languageId, problem.TestCases)

    const data = result.testResults.map(async (t) => {
      await prisma.submissions.create({
        data: {
          match_Id: matchId,
          problem_Id: problemId,
          user_Id: userId,
          code: code,
          verdict: t.verdict,
          language: language,
          actual: t.actual,
          exec_time_ms: t.exec_time_ms,
          memory_kb: t.memory_kb,
          is_final: true,
        },
      })
    })

    const match = await prisma.matches.findUnique({
      where: {
        id: matchId,
      },
      select: {
        id: true,
        matchName: true,
        player_Id_One: true,
        player_Id_Two: true,
        problem_Id: true,
        winner_Id: true,
        submissions: true,
      },
    })

    if (!match) {
      return NextResponse.json(
        {
          message: ' something went wrong not match not find',
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: 'submission done ',
        match,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Check Code Error:', error)

    return NextResponse.json(
      {
        message: 'Internal Server Error',
      },
      {
        status: 500,
      }
    )
  }
}
