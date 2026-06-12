import { createClient } from "redis";
import "dotenv/config";


const client = createClient({
  url: process.env.REDIS_URL
});

client.on("error", function (err) {
  throw err;
});

const connectRedis = async () => {
  await client.connect()
  console.log("✅ Redis connected")
}


const addInTheQueue = async (userId: string, problemId: string) => {
  if (client.isOpen == false) await connectRedis()

  // get everyone currently waiting
  const allWaiting = await client.lRange('queue', 0, -1)
  // console.log("all waiting : " , allWaiting)

  // find a match with same problemId
  const opponentRaw = allWaiting.find((entry) => {
    const user = JSON.parse(entry.toString())
    return user.problemId === problemId && user.userId !== userId
  })

  // match found
  if (opponentRaw) {
    const opponent = JSON.parse(opponentRaw.toString())
    await client.lRem('queue', 1, opponentRaw)

    // ← tell the waiting player they got matched
    await client.set(`matched:${opponent.userId}`, JSON.stringify({
      status: "matched",
      opponent: { userId }
    }))

    return {
      status: "matched",
      opponent
    }
  }

  // no match found → add current player to queue
  // trying to push the user and checking if the user doest not exits in the queue

  const checkingTheUser = allWaiting.find((entry) => {

    const queuedUser = JSON.parse(entry) as { userId: string; problemId: string }
    return queuedUser.userId === userId;
  })

  if (!checkingTheUser) {
    await client.rPush('queue', JSON.stringify({ userId, problemId }))
  }

  return {
    status: "waiting",
  }
}

const removeFromTheQueue = async (userId: string, problemId: string) => {
  if (client.isOpen == false) await connectRedis()
  const remove = await client.lRem('queue', 1, JSON.stringify({ userId, problemId }))
  return remove;

}

// add this to redis.ts
const checkIfMatched = async (userId: string) => {
  if (client.isOpen == false) await connectRedis()

  // check if a match was created for this user
  const matchRaw = await client.get(`matched:${userId}`)
  if (matchRaw) {
    await client.del(`matched:${userId}`) // clean up
    return JSON.parse(matchRaw)
  }
  return null
}

// storing the match
const matchFound = async (
  playerOne: string,
  playerTwo: string,
  matchName: string,
  problemId: string
) => {
  if (client.isOpen == false) await connectRedis()

  const matchData = {
    playerOne,
    playerTwo,
    problemId,
    matchName
  }

  await client.set(matchName, JSON.stringify(matchData))  // store in redis
  
  return matchData  
}

const deleteTheMatchFound = async (
  // playerOne: string,
  // playerTwo: string,
  matchName: string,
  // problemId: string
) => {
  if (client.isOpen == false) await connectRedis()
    
  //  const matchData = {
  //   playerOne,
  //   playerTwo,
  //   problemId,
  //   matchName
  // }

  const deleteMatch = await client.unlink(matchName);

  return deleteMatch;
}

export {
  matchFound,
  addInTheQueue,
  removeFromTheQueue,
  checkIfMatched,
  deleteTheMatchFound
}