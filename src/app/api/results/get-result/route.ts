import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/src/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        {
          message: 'Invaild User ',
        },
        { status: 401 }
      )
    }

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
