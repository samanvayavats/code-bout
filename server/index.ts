import { WebSocketServer, WebSocket } from "ws"
// import { matchFound } from "@/src/lib/redis"

const wss = new WebSocketServer({ port: 8000 })

interface ExtendedWebSocket extends WebSocket {
  user: {
    id?: string
    username?: string
    problemId?: string
  }
}

const matches = new Map<string, ExtendedWebSocket[]>()

wss.on("connection", (ws: ExtendedWebSocket) => {

  ws.user = {}

  ws.on("error", console.error)

  ws.on("message", (data: any) => {
    const message = JSON.parse(data)
    console.log("received:", message)

    // 1. user connects to socket server
    if (message.type === "user-connect") {
      ws.user.id = message.id
      ws.user.username = message.username
      ws.user.problemId = message.problemId
      console.log(`✅ user connected: ${message.username}`)
    }

    // 2. both players join a match room
    else if (message.type === "match-found") {
      const  matchName  = message.matchName   // ← fix

      if (!matches.has(matchName)) {
        matches.set(matchName, [])
      }

      matches.get(matchName)?.push(ws)
      console.log(`player joined match: ${matchName}`)
  
      // store in redis too
      const players = matches.get(matchName)
      if (players?.length === 2) {
        // both players joined → store match in redis
        // matchFound(
        //   players[0].user.id!,
        //   players[1].user.id!,
        //   matchName,
        //   message.problemId
        // )

        // notify both players match is ready
        players.forEach((client) => {
          client.send(JSON.stringify({
            type: "match-started",
            matchName,
            problemId: message.problemId,
          }))
        })
      }
    }

    // 3. broadcast problem to both players
    else if (message.type === "broadcast-match") {
      const  matchName  = message.matchName 
      const problemId   = message.problemId
      const code = message.code

      const players = matches.get(matchName)

      if (!players) {
        ws.send(JSON.stringify({ type: "error", message: "match not found" }))
        return
      }

      players.forEach((client) => {
        client.send(JSON.stringify({
          type: "match-data",
          matchName,
          problemId,
          code
        }))
      })

      console.log(`broadcasted match: ${matchName}`)
    }
    else if(message.type == "match-completed"){
      const matchName = message.matchName;

      const match = matches.delete(matchName)
      console.log("the match is deleted")
    }
  })

  ws.on("close", () => {
    console.log(`user disconnected: ${ws.user.username}`)
  })
})

console.log("⚡ WebSocket server running on port 8000")