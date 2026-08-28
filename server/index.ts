import { WebSocketServer, WebSocket } from 'ws'

const wss = new WebSocketServer({ port: 8000 })

interface ExtendedWebSocket extends WebSocket {
  user: {
    id?: string
    username?: string
    problemId?: string
    matchId?: string
  }
}

const matches = new Map<string, ExtendedWebSocket[]>()

// Remove a socket from its match
function removeSocketFromMatch(ws: ExtendedWebSocket) {
  const matchId = ws.user.matchId

  if (!matchId) return

  const players = matches.get(matchId)

  if (!players) return

  const index = players.indexOf(ws)

  if (index !== -1) {
    players.splice(index, 1)
  }

  if (players.length === 0) {
    matches.delete(matchId)
  }

  ws.user.matchId = undefined
}

// Remove an old socket belonging to the same user
function removeOldUserSocket(userId: string) {
  for (const [matchId, players] of matches) {
    const index = players.findIndex((player) => player.user.id === userId)

    if (index !== -1) {
      players.splice(index, 1)

      if (players.length === 0) {
        matches.delete(matchId)
      }

      return matchId
    }
  }

  return null
}

wss.on('connection', (ws: ExtendedWebSocket) => {
  ws.user = {}

  ws.on('error', console.error)

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString())

      // 1. USER CONNECT

      if (message.type === 'user-connect') {
        ws.user.id = message.userId
        ws.user.username = message.username
        ws.user.problemId = message.problemId

        console.log(`User connected: ${ws.user.username} (${ws.user.id})`)
      }

      // 2. USER RECONNECT
      else if (message.type === 'user-reconnect') {
        const userId = message.userId
        const matchId = message.matchId

        ws.user.id = userId
        ws.user.username = message.username
        ws.user.problemId = message.problemId
        ws.user.matchId = matchId

        // Remove old socket belonging to this user
        const oldMatchId = removeOldUserSocket(userId)

        // Get/create match
        let players = matches.get(matchId)

        if (!players) {
          players = []
          matches.set(matchId, players)
        }

        // Add new socket
        players.push(ws)

        console.log(`User ${userId} reconnected to match ${matchId}`)

        // Tell this user that reconnection succeeded
        ws.send(
          JSON.stringify({
            type: 'match-reconnected',
            matchId,
            problemId: message.problemId,
            players: players.map((player) => ({
              id: player.user.id,
              username: player.user.username,
            })),
          })
        )

        // If both players are connected again,
        // notify both players
        if (players.length === 2) {
          players.forEach((client) => {
            client.send(
              JSON.stringify({
                type: 'match-started',
                matchId,
                problemId: message.problemId,
                players: players.map((player) => ({
                  id: player.user.id,
                  username: player.user.username,
                })),
              })
            )
          })
        }
      }

      // 3. MATCH FOUND
      else if (message.type === 'match-found') {
        const matchId = message.matchId
        const userId = message.userId

        if (!matchId || !userId) {
          ws.send(
            JSON.stringify({
              type: 'error',
              message: 'matchId or userId missing',
            })
          )

          return
        }

        ws.user.id = userId
        ws.user.matchId = matchId
        ws.user.problemId = message.problemId

        // Create match if it doesn't exist
        if (!matches.has(matchId)) {
          matches.set(matchId, [])
        }

        const players = matches.get(matchId)!

        // Check if this user already exists
        const existingIndex = players.findIndex((player) => player.user.id === userId)

        // If user already exists, replace old socket
        if (existingIndex !== -1) {
          players.splice(existingIndex, 1)
        }

        // Match only supports 2 players
        if (players.length >= 2) {
          ws.send(
            JSON.stringify({
              type: 'error',
              message: 'Match is already full',
            })
          )

          return
        }

        players.push(ws)

        console.log(`Player ${userId} joined match ${matchId}`)

        // Two players connected
        if (players.length === 2) {
          players.forEach((client) => {
            client.send(
              JSON.stringify({
                type: 'match-started',
                matchId,
                problemId: message.problemId,
                players: players.map((player) => ({
                  id: player.user.id,
                  username: player.user.username,
                })),
              })
            )
          })
        }
      }

      // 4. USER SUBMIT
      else if (message.type === 'user-submit') {
        const userId = message.userId
        const matchId = message.matchId

        const players = matches.get(matchId)

        if (!players) {
          ws.send(
            JSON.stringify({
              type: 'error',
              message: 'match not found',
            })
          )

          return
        }

        players.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: 'player-submit',
                userId,
                message: `Player with id ${userId} submitted the code`,
              })
            )
          }
        })
      }

      // 5. BROADCAST MATCH
      else if (message.type === 'broadcast-match') {
        const matchId = message.matchId
        const problemId = message.problemId
        const code = message.code

        const players = matches.get(matchId)

        if (!players) {
          ws.send(
            JSON.stringify({
              type: 'error',
              message: 'match not found',
            })
          )

          return
        }

        players.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: 'match-data',
                matchId,
                problemId,
                code,
              })
            )
          }
        })
      }

      // 6. MATCH COMPLETED
      else if (message.type === 'match-completed') {
        const matchId = message.matchId

        matches.delete(matchId)

        console.log(`Match ${matchId} completed`)
      }
    } catch (error) {
      console.error('Invalid WebSocket message:', error)
    }
  })

  // 7. SOCKET CLOSED

  ws.on('close', () => {
    console.log(`Socket disconnected: ${ws.user.username ?? 'unknown'}`)

    removeSocketFromMatch(ws)
  })
})

console.log('⚡ WebSocket server running on port 8000')
