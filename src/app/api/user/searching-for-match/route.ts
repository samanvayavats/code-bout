import { NextRequest, NextResponse } from "next/server";
import { addInTheQueue, matchFound, checkIfMatched ,removeFromTheQueue } from "@/src/lib/redis";
import { setTimeout as delay } from 'timers/promises';
import prisma from "@/src/lib/prisma";
// route for creating the match
  export async function POST(request: NextRequest) {
  const body = await request.formData()
  const problemId = body.get("problemId") as string
  const title = body.get("title") as string
  const userId = body.get("userId") as string

  // first try to find match immediately
  let result = await addInTheQueue(userId, problemId)

  // if waiting → poll every 3s for 60s to see if someone matched us
  if (result.status === "waiting") {
    for (let i = 0; i < 10; i++) {       // 10 × 6s = 60s
      await delay(6000)

      // check if someone matched with us while we were waiting
      const matched = await checkIfMatched(userId)
      if (matched) {
        result = matched
        break
      }

      // also try matching again (new players may have joined)
      result = await addInTheQueue(userId, problemId)
      if (result.status === "matched") break
    }
  }

  // remove from queue either way
  await removeFromTheQueue(userId, problemId)

  if (result.status === "matched") {
    
    const match = await prisma.matches.create({
      data :{
        player_Id_One : userId ,
        player_Id_Two : result.opponent?.userId,
        problem_Id : problemId, 
      },
      select :{
        id:true ,
        player_Id_One : true ,
        player_Id_Two : true ,
        problem_Id:true
      }
    })

    return NextResponse.json({
      message: "match found",
      match,
    }, { status: 201 })
  }

  return NextResponse.json({
    message: "match not found"
  }, { status: 404 })
}