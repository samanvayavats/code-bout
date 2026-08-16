export const createAverageScores = (submission: any[]) => {
  // logic for the winner
  let average_exec_time_ms = 0
  let average_memory_kb = 0
  let average_Verdict = 0
  let submissions = 0
  let pointCount = 0
  submission.forEach((e) => {
    if (e?.verdict === 'Accepted') {
      average_Verdict += 100
    } else {
      average_Verdict += 0
    }

    average_exec_time_ms += e?.exec_time_ms
    average_memory_kb += e?.memory_kb
    submissions++
  })

  let submission_Time = submission[0]?.submitted_at
  let user_Id = submission[0].user_Id
  return {
    average_Verdict: average_Verdict / submissions,
    average_exec_time_ms: average_exec_time_ms / submissions,
    average_memory_kb: average_memory_kb / submissions,
    submission_Time,
    user_Id,
    pointCount,
  }
}

export const getIndividualSubmission = (
  player_Id_One: string,
  player_Id_Two: string,
  submissions: any[]
) => {
  const player_one_submission: any[] = []
  const player_two_submission: any[] = []

  submissions.forEach((s) => {
    if (s?.user_Id == player_Id_One) {
      player_one_submission?.push(s)
    } else {
      player_two_submission.push(s)
    }
  })

  return { player_one_submission, player_two_submission }
}

type User = {
  average_Verdict: string
  average_exec_time_ms: number
  average_memory_kb: number
  submission_Time: Date | any
  user_Id: string
  pointCount: number
}

export const getWinner = async (userOne: User, userTwo: User) => {
  if (userOne.average_Verdict < userTwo.average_Verdict) {
    userOne.pointCount += 1
  } else {
    userTwo.pointCount += 1
  }

  if (userOne.average_exec_time_ms < userTwo.average_exec_time_ms) {
    userOne.pointCount += 1
  } else {
    userTwo.pointCount += 1
  }

  if (userOne.average_memory_kb < userTwo.average_memory_kb) {
    userOne.pointCount += 1
  } else {
    userTwo.pointCount += 1
  }

  if (userOne.pointCount == userTwo.pointCount) {
    if (userOne.submission_Time < userTwo.submission_Time) {
      userOne.pointCount += 1
    } else {
      userTwo.pointCount += 1
    }
  }

  let winner_Id
  let loser_Id

  if (userOne.pointCount > userOne.pointCount) {
    winner_Id = userOne.user_Id
    loser_Id = userTwo.user_Id
  } else {
    winner_Id = userTwo.user_Id
    loser_Id = userOne.user_Id
  }

  return [userOne, userTwo, { winner_Id: winner_Id }, { loser_Id: loser_Id }]
}
