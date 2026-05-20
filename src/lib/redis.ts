import { createClient } from "redis";
import "dotenv/config";
import { useId } from "react";
const client = createClient({
  url: process.env.REDIS_URL
});

client.on("error", function(err) {
  throw err;
});

const connectRedis = async () => {
  await client.connect()
  console.log("✅ Redis connected")
}

connectRedis()

const addInTheQueue = async (userId: string, problemId: string) => {

  // get everyone currently waiting
  const allWaiting = await client.lRange('queue', 0, -1)

  // find a match with same problemId
  const opponentRaw = allWaiting.find((entry) => {
    const user = JSON.parse(entry.toString())
    return user.problemId === problemId && user.userId !== userId
  })

  // match found
  if (opponentRaw) {
    const opponent = JSON.parse(opponentRaw.toString())

    // remove opponent from queue
    await client.lRem('queue', 1, opponentRaw)

    return {
      status: "matched",
      opponent
    }
  }

  // no match found → add current player to queue
  await client.rPush('queue', JSON.stringify({ userId, problemId }))

  return {
    status: "waiting"
  }
}

const result =await addInTheQueue('4' ,'2');
console.log("queue redis logic ",result)


// storing the match
const matchFound = async (
  playerOne : string,
  playerTwo : string,
  matchName : string,
  problemId : string
) => {
  await client.set(matchName, JSON.stringify({
    playerOne,
    playerTwo,
    problemId,
    startedAt: Date.now(),
    status: "active"
  }))

  console.log(`Match created: ${matchName}`)
}


export {
    matchFound ,
    addInTheQueue
}