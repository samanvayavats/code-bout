// this is the route will be used for the calculating the results for the code battle
import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/src/lib/prisma'
import { createAverageScores, getIndividualSubmission, getWinner } from '@/src/lib/resutls'

type User = {
  average_Verdict: number
  average_exec_time_ms: number
  average_memory_kb: number
  submission_Time: Date | any
  user_Id: string
  pointCount: number
  code: string
}

type Result = {
  user_Id: string
  winner_Id: string
  loser_Id: string
  match_Id: string
  average_Verdict: number
  average_exec_time_ms: number
  average_memory_kb: number
  submission_Time: string
  pointCount: number
  code: string
  created_At: Date
}

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const matchId = searchParams.get('matchId')
    if (!matchId) {
      return NextResponse.json(
        {
          message: 'matchId is required ',
        },
        { status: 401 }
      )
    }

    const resultsDeclared = await prisma.results.findFirst({
      where: { match_Id: matchId },
    })
    if (resultsDeclared) {
      return NextResponse.json(
        {
          message: 'the results are already out',
        },
        { status: 400 }
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

    const player_Id_One = match?.player_Id_One as string
    const player_Id_Two = match?.player_Id_Two as string

    const { player_one_submission, player_two_submission } = getIndividualSubmission(
      player_Id_One,
      player_Id_Two,
      (match?.submissions as any[]) ?? []
    )

    const resultsForPlayerOne: User | any = createAverageScores(
      (player_one_submission as any[]) ?? []
    )
    const resultsForPlayerTwo: User | any = createAverageScores(
      (player_two_submission as any[]) ?? []
    )

    // console.log(resultsForPlayerOne ,resultsForPlayerTwo)

    const answer = await getWinner(resultsForPlayerOne, resultsForPlayerTwo)
    console.log('answer : ', answer)

    // lets create the final result

    const userOneResult: Result | any = answer[0]
    const userTwoResult: Result | any = answer[1]
    const winner_Id: string | any = answer[2]
    const loser_Id: string | any = answer[3]

    // updating / declaringTheWinnerInMatch

    await prisma.matches.update({
      where: {
        id: matchId,
      },
      data: {
        winner_Id,
      },
    })

    // creating the result for both the user
    const finalResultForTheUserOne = await prisma.results.create({
      data: {
        user_Id: userOneResult?.user_Id,
        winner_Id: winner_Id,
        loser_Id: loser_Id,
        match_Id: matchId,
        average_exec_time_ms: userOneResult.average_exec_time_ms,
        average_memory_kb: userOneResult.average_memory_kb,
        average_Verdict: userOneResult.average_Verdict,
        code: userOneResult.code,
        submission_Time: String(userOneResult.submission_Time),
        pointCount: userOneResult.pointCount,
      },
    })
    const finalResultForTheUserTwo = await prisma.results.create({
      data: {
        user_Id: userTwoResult?.user_Id,
        winner_Id: winner_Id,
        loser_Id: loser_Id,
        match_Id: matchId,
        average_exec_time_ms: userTwoResult.average_exec_time_ms,
        average_memory_kb: userTwoResult.average_memory_kb,
        average_Verdict: userTwoResult.average_Verdict,
        code: userTwoResult.code,
        submission_Time: String(userTwoResult.submission_Time),
        pointCount: userTwoResult.pointCount,
      },
    })

    return NextResponse.json(
      {
        message: 'Results out',
        finalResultForTheUserOne,
        finalResultForTheUserTwo,
        winner_Id,
        loser_Id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.log('the error at the time of creating the results', error)
    return NextResponse.json(
      {
        message: 'result compute failed',
      },
      { status: 500 }
    )
  }
}
