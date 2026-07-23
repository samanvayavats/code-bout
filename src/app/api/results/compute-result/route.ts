// this is the route will be used for the calculating the results for the code battle
import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/src/lib/prisma'
export async function PATCH(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    console.log('--------------------', searchParams)
    const matchId = searchParams.get('matchId')
    if (!matchId) {
      return NextResponse.json(
        {
          message: 'matchId is required ',
        },
        { status: 401 }
      )
    }

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

    const player_Id_One = match?.player_Id_One
    const player_Id_Two = match?.player_Id_Two

    return NextResponse.json(
      {
        message: 'done',
        match,
      },
      { status: 200 }
    )
  } catch (error) {}
}
