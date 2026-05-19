import { WebSocketServer } from "ws";
const ws = new WebSocketServer({
    port:8000
})

ws.on("connection" ,(ws)=>{
    console.log('the connection is made')
    ws.send(JSON.stringify({
        message:"hi there"
    }))
})