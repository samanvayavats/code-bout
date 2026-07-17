import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/src/lib/prisma'
import { LANGUAGES, buildSolution, runCodeAgainstAllTestCases } from '@/src/lib/judge'

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData()

    const code = body.get('code') as string
    const language = body.get('language') as string
    const problemId = body.get('problemId') as string

    if (!code || !language || !problemId) {
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

    const visibleTestCases = problem.TestCases.filter((tc) => !tc.is_Hidden) ?? []

    const result = await runCodeAgainstAllTestCases(sourceCode, languageId, visibleTestCases)

    return NextResponse.json(
      {
        result,
      },
      {
        status: 200,
      }
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
