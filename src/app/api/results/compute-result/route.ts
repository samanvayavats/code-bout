import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/src/lib/prisma'
import { createAverageScores, getIndividualSubmission, getWinner } from '@/src/lib/resutls'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth'

type User = {
  average_Verdict: number
  average_exec_time_ms: number
  average_memory_kb: number
  submission_Time: Date | string
  user_Id: string
  pointCount: number
  code: string
}

export async function POST(request: NextRequest) {
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

    // Get matchId
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

    //  Check if results already exist
    const existingResults = await prisma.results.findMany({
      where: {
        match_Id: matchId,
      },
    })

    if (existingResults.length > 0) {
      return NextResponse.json(
        {
          message: 'The results are already out',
          results: existingResults,
        },
        { status: 200 }
      )
    }

    // Get match

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
          message: 'Match not found',
        },
        { status: 404 }
      )
    }

    // Get both player IDs

    const player_Id_One = match.player_Id_One
    const player_Id_Two = match.player_Id_Two

    if (!player_Id_One || !player_Id_Two) {
      return NextResponse.json(
        {
          message: 'Both players are required to calculate results',
        },
        { status: 400 }
      )
    }

    // Separate submissions for both players

    const { player_one_submission, player_two_submission } = getIndividualSubmission(
      player_Id_One,
      player_Id_Two,
      (match.submissions as any[]) ?? []
    )

    // Calculate average scores

    const resultsForPlayerOne: User | any = createAverageScores(
      (player_one_submission as any[]) ?? []
    )

    const resultsForPlayerTwo: User | any = createAverageScores(
      (player_two_submission as any[]) ?? []
    )

    // Decide winner

    const answer = await getWinner(resultsForPlayerOne, resultsForPlayerTwo)

    const userOneResult: User | any = answer[0]
    const userTwoResult: User | any = answer[1]

    const winner_Id: string | any = answer[2]
    const losser_Id: string | any = answer[3]

    // Create results + update the wins and loss +update match atomically

    await prisma.$transaction(async (tx) => {
      const checkIftheWinnerIsNull = await prisma.matches.findUnique({
        where: {
          id: matchId,
        },
      })

      // making sure the wins and looses is updated once

      if (checkIftheWinnerIsNull?.winner_Id == null && checkIftheWinnerIsNull?.losser_Id == null) {
        await tx.user.update({
          where: {
            id: winner_Id,
          },
          data: {
            wins: {
              increment: 0.5,
            },
          },
        })

        await tx.user.update({
          where: {
            id: losser_Id,
          },
          data: {
            losses: {
              increment: 0.5,
            },
          },
        })
      }

      await tx.matches.update({
        where: {
          id: matchId,
        },
        data: {
          winner_Id,
        },
      })

      await tx.matches.update({
        where: {
          id: matchId,
        },
        data: {
          losser_Id: losser_Id,
        },
      })

      await tx.results.createMany({
        data: [
          {
            user_Id: userOneResult.user_Id,
            winner_Id,
            losser_Id,
            match_Id: matchId,
            average_exec_time_ms: userOneResult.average_exec_time_ms,
            average_memory_kb: userOneResult.average_memory_kb,
            average_Verdict: userOneResult.average_Verdict,
            code: userOneResult.code,
            submission_Time: String(userOneResult.submission_Time),
            pointCount: userOneResult.pointCount,
          },

          {
            user_Id: userTwoResult.user_Id,
            winner_Id,
            losser_Id,
            match_Id: matchId,
            average_exec_time_ms: userTwoResult.average_exec_time_ms,
            average_memory_kb: userTwoResult.average_memory_kb,
            average_Verdict: userTwoResult.average_Verdict,
            code: userTwoResult.code,
            submission_Time: String(userTwoResult.submission_Time),
            pointCount: userTwoResult.pointCount,
          },
        ],

        skipDuplicates: true,
      })
    })

    //Get final results

    const results = await prisma.results.findMany({
      where: {
        match_Id: matchId,
      },
    })

    // Return results

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
