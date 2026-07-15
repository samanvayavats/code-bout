import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/src/lib/prisma'
import { LANGUAGES, runCodeAgainstAllTestCases } from '@/src/lib/judge'

const extractFunctionName = (code: string) => {
  const patterns = [
    /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/,
    /const\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*\(/,
    /const\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*function/,
  ]

  for (const pattern of patterns) {
    const match = code.match(pattern)

    if (match) {
      return match[1]
    }
  }

  return null
}

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

    const functionName = extractFunctionName(code)

    if (!functionName) {
      return NextResponse.json(
        {
          message: 'Could not extract function name from submitted code',
        },
        {
          status: 400,
        }
      )
    }

    console.log('Detected Function:', functionName)

    const problem = await prisma.problem.findUnique({
      where: {
        id: problemId,
      },
      select: {
        title: true,
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

    const visibleTestCases = problem.TestCases.filter((tc) => !tc.is_Hidden) ?? []

    console.log('Visible Test Cases:', visibleTestCases)

    const result = await runCodeAgainstAllTestCases(
      code,
      languageId,
      functionName,
      visibleTestCases
    )

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
