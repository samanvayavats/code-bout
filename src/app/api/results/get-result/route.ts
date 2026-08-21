import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/src/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const matchId = searchParams.get('matchId')

    if (!matchId) {
      return NextResponse.json(
        {
          message: 'matchId is required',
        },
        { status: 400 }
      )
    }

    const results = await prisma.results.findMany({
      where: {
        match_Id: matchId,
      },
    })

    return NextResponse.json(
      {
        message: 'Results out',
        results,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('The error at the time of creating the results:', error)

    return NextResponse.json(
      {
        message: 'Result compute failed',
      },
      { status: 500 }
    )
  }
}
